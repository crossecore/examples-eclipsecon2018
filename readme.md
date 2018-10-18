# App Architecture

This showcase presents how CrossEcore TypeScript can be used in a browser based [Angular](https://angular.io/) app with the [Angular Material](https://v5.material.angular.io/) user interface or as a hybrid app with a [Tabris](https://tabris.com/) user interface.
It also shows how Ecore models can be stored in the document-based NoSQL database [PouchDB](https://pouchdb.com/). PouchDB synchronizes with a remote [Apache CouchDB](http://couchdb.apache.org/) and stores the data locally on the end-user devices with the aid of the WebSQL adapter in the web browser and with the SQLite adapter in the hybrid app.


# The model

A ``Conference`` consists of multiple ``Talks``.
A ``Talk`` is associated with a ``Track``.
A ``Talk`` has ``speakers`` which are ``Persons`` and the other way round a ``Person`` can give a ``Talk``.
A ``Talk`` has ``attendees`` which are ``Persons`` and the other way round a ``Person`` can attend a ``Talk``.
A ``Person`` has a ``firstName`` and a ``lastName``.
A ``Person`` ``worksFor`` an ``Organization``.
A ``Talk`` takes place in one ``Room``.


# CrossEcore Features

## Persistence

If you have worked with the Eclipse Modeling Framework before, you might be familiar with the default persistence technology XMI which reades from and writes to models as XML.
As a side note, CrossEcore comes with an XMIResource that allows you to read and write your existing XMI models.

This showcase instead uses a document-based NoSQL database as persistence technology.
This app has three memory layers:
The first layer is a remote CouchDB database.
The second layer is a local PouchDB database.
The second layer allows the user to continue working even if the Internet connection is lost.
CouchDB and PouchDB use JSON as serialization format.
The Angular app uses the [WebSQL adapter of PouchDB](https://pouchdb.com/adapters.html).
The Tabris app uses the [SQLite adapter of PouchDB](https://pouchdb.com/adapters.html).
The model that is stored in-memory can be seen as a third, non-persistent layer.

PouchDB comes with a [synchronization](https://pouchdb.com/api.html#sync) mechanism that keeps the remote and local database synchronized.
The following code starts a continuous synchronization between the local database *eclipsecon* and the remote database *http://localhost:5984/eclipsecon/*;

```typescript
PouchDB.sync('eclipsecon', 'http://localhost:5984/eclipsecon/', {
  live: true,
  retry: true
});
```

When the app starts, it initializes the sychronization.
If the local database is up-to-date, the app iterates over all JSON documents and uses the Factory to create objects the objects and resolves cross-references.
Subsequent changes from the remote database are continuously propagated to the second and third layer.
The propagation of changes from the third layer to the upper layers is done by  notifications/adapters that is described in the following section:


## Notifications


```typescript
import {Adapter} from 'ecore/Adapter';
import {Notification} from 'ecore/Notification';
import {NotificationImpl} from 'ecore/NotificationImpl';

class MyAdapter implements Adapter{

  notifyChanged(notification:Notification){

    console.log(notification);

    switch(notification.getEventType()){
      case NotificationImpl.ADD: console.log("ADD");break;
      case NotificationImpl.REMOVE: console.log("REMOVE");break;
      case NotificationImpl.SET: console.log("SET");break;
    }
  }
}

this.conference.eAdapters().push(new MyAdapter());
```

## Reflection

This example shows how to use the Ecore reflection API to realize a dynamic property editor. From a given object instance, the superordinate ``EClass`` is determined. It iterates over all its ``EAttributes`` (even inherited) and renders dynamically UI elements that correspond to the ``eType`` of the respective ``EAttribute``.
The following code snipped illustrates how to use reflection within an Angular HTML template.

```html
<mat-form-field *ngFor="let attribute of user.eClass().eAllAttributes">
  <input matInput [placeholder]="attribute.name">
</mat-form-field>
```


## Factories

When you use the factory to create objects, the factory will take care of proper object registration that are necessary such that features like reflection and the OCL operations ``allInstances()`` will work properly.
For example, you call ``ConferenceFactoryImpl.eINSTANCE.createTalk()`` to create a new ``Talk`` object (insteading using the ``new`` operator).
The following code shows how to use the factory in TypeScript:

```typescript
let talk: Talk = ConferenceFactoryImpl.eINSTANCE.createTalk();
```

## Referential Integrity (Bi-directional Associations)

A ``Person`` ``attends`` ``Talks`` and ``Talks`` have multiple ``Persons`` that ``attend``.
Whenever a ``Talk`` is added to the list of ``Talks`` a ``Person`` attends, this ``Person`` needs to be added to the list of ``attendees`` of this ``Talk`` to keep this bi-directional association consistent.
One can use the ``eOpposite`` feature to model such kind of bi-directional associations.
If you establish an association in one direction, the API keeps the other direction consistent automatically for you.
The following TypeScript code illustrates how to keep the associations between ``Persons`` and ``Talks`` consistent:

```typescript
let person:Person = ConferenceFactoryImpl.eINSTANCE.createPerson();
let talk:Talk = ConferenceFactoryImpl.eINSTANCE.createTalk();

person.attends.add(talk);

console.log(talk.attendees.includes(person)); //returns true
console.log(person.attends.includes(talk)); //returns true

talk.attendees.remove(person);

console.log(person.attends.excludes(talk)); //returns true
console.log(talk.attendees.excludes(person)); //returns true
```


## Object Constraint Langauge
### Validation

The OCL invariant ``noConflict`` asserts that all ``Talks`` a ``Person`` *self* ``attends`` are not temporally overlapping.

```javascript
invariant noConflict:
self.attends
  ->forAll(t1:Talk | self.attends
    ->forAll(t2:Talk|
      (t1.timeBegin < t2.timeBegin and
      t1.timeEnd <= t2.timeBegin)
      or
      (t2.timeBegin < t1.timeBegin and
      t2.timeEnd <= t1.timeBegin)
    )
  );
```

The corresponding code in TypeScript looks as follows:

```typescript
this.attends
  .forAll(t1 => this.attends
    .forAll(
      t2 => (t1.timeBegin < t2.timeBegin &&
      t1.timeEnd <= t2.timeBegin)
      ||
      (t2.timeBegin < t1.timeBegin &&
      t2.timeEnd <= t1.timeBegin)
    )
  );
```

### Queries

The query ``meetPersonAt(other:Person):Talk`` returns all ``Talks`` where ``Persons`` *self* and *other* will meet, no matter if they are a ``speaker`` or ``attendee``.

```javascript
Talk.allInstances()
  ->select(t:Talk |
    (t.speakers->includes(self) or
    t.attendees->includes(self))
    and
    (t.speakers->includes(other) or
    t.attendees->includes(other))
  );
```

```typescript
TalkImpl.allInstances()
  .select(t =>
    (t.speakers.includes(this) ||
    t.attendees.includes(this))
    &&
    (t.speakers.includes(this) ||
    t.attendees.includes(this)
  )
);
```


### Derived Attributes

A ``Conference`` consists of ``Talks`` and ``Tracks``.
A ``Track`` has multiple ``Talks``.
The other way round, a ``Talk`` is assigned to a ``Track``.
This means the connection of a ``Conference`` to a certain ``Talk`` *self* needs to be maintained as well as a connection between a ``Track`` and ``Talk`` *self*.
If the *self* object would be stored redundantly in two separate list of a ``Conference`` and a ``Track``, this would unnesessarily increase memory consumption and require that copies of *self* are kept consistent.

Derived attributes calculate values, objects or collections by an OCL calculation rule.
The navigating expression are a simple form of model queries that do not have additional call arguments.

The OCL expression that selects all ``Talks`` assigned to a ``Track`` looks like this:

```javascript
self.conference.talks->select(t:Talk|t.track = self);
```

The variable *self* points to a given ``Talk``.
The expression navigates over the ``Conference`` the ``Talk`` is contained in.
Then it iterates over all the ``Conference``'s ``Talks`` and selects the ``Talks`` whose ``Track`` is *self*.

CrossEcore's OCL compiler automatically translates this OCL expression into a expression of the target language, e.g. TypeScript.
This is how the corresponding TypeScript expression looks like:

```typescript
this.conference.talks.select(t => t.track == this);
```


# Building
## Angular App
Install [Node.js](https://nodejs.org).
Open a command line interface and install Angular CLI via the Node.js Package Manager (npm).


```bash
npm install angular-cli -g
```
Change the working directory to *angular-app/*.

```bash
cd angular-app
npm install
```

Starting a web server and open the app in a browser.

```bash
ng serve --open
```


## Tabris App

https://docs.tabris.com/latest/build.html

```bash
npm install -g tabris-cli
```

```bash
tabris build android
```
