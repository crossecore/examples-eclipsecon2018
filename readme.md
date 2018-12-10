# CrossEcore Showcase

This showcase presents how CrossEcore TypeScript can be used in a browser based [Angular](https://angular.io/) app with the [Angular Material](https://v5.material.angular.io/) user interface or as a hybrid app with a [Tabris](https://tabris.com/) user interface.
It also shows how Ecore models can be stored in the document-based NoSQL database [PouchDB](https://pouchdb.com/). PouchDB synchronizes with a remote [Apache CouchDB](http://couchdb.apache.org/) and stores the data locally on the end-user devices with the aid of the WebSQL adapter in the web browser and with the SQLite adapter in the hybrid app.


# The model

![Conference Model Diagram](https://raw.githubusercontent.com/crossecore/examples-eclipsecon2018/master/model/model/diagram.png "Conference Model Diagram")

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
The following code starts a continuous synchronization between the local database *eclipsecon* and the remote database *http://localhost:5984/eclipsecon/*.

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

Notifications allow you to react on model changes.
You just need to implement the ``Adapter`` interface and its ``notifyChanged`` method.
Adapters are like listeners that listens to events fired by a notifier if the notifier changed.
The ``notifyChanged`` method has an argument ``notification``.
The notification is an ``ENotificationImpl`` object from which you can access the notifier (``getNotifier()``), the event type (``getEventType()``), the affected EStructuralFeature (``getFeature()``), the new value of the feature after the change (``getNewValue()``) and the old value before the change (``getOldValue()``).
Objects that implement the Adapter interface needs to be added to the list of eAdapters of the notifier.

In the concrete case, the adapter in following example listen to changes to the user object.
This means the user object is the notifier.
Every time the user adds or removes talks from the list of attending talks, the notifyChange method is fired.
``JsonResource.asJson()`` serializes the user object as a JSON document and puts this document to the local PouchDB.
The local changes are automatically propagated to the remote CouchDB as the synchronization that was described in the previous section is still running in the background.

```typescript
class MyAdapter implements Adapter{

  notifyChanged(notification:Notification){

    let notifier = notification.getNotifier();

    if(notifier!==null){
      let doc = new JsonResource().asJson(notifier);
      new PouchDB('eclipsecon').put(doc)
        .then(function (response) {
        // handle response
      }).catch(function (err) {
        console.log(err);
      });
    }

  }
}

this.user.eAdapters().push(new MyAdapter());
```

## Reflection

This example shows how to use the Ecore reflection API to realize a dynamic property editor. From a given object instance, the superordinate ``EClass`` is determined. It iterates over all its ``EAttributes`` (even inherited) and renders dynamically UI elements that correspond to the ``eType`` of the respective ``EAttribute``.
The following code snipped illustrates how to use reflection within an Angular HTML template.

```html
<div *ngFor="let attribute of user.eClass().eAllAttributes">
<mat-form-field *ngIf="attribute.eType.name==='EString'">
  <input matInput  [placeholder]="attribute.name" [value]="user.eGet(attribute)">
</mat-form-field>
<mat-form-field *ngIf="attribute.eType.name==='EInt'">
  <input matInput [placeholder]="attribute.name" [value]="user.eGet(attribute)" type="number">
</mat-form-field>
<mat-form-field *ngIf="attribute.eType.name==='EDate'">
  <input matInput [matDatepicker]="picker" [placeholder]="attribute.name" [value]="user.eGet(attribute)">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
<mat-slide-toggle *ngIf="attribute.eType.name==='EBoolean'" [checked]="user.eGet(attribute)===true">{{attribute.name}}</mat-slide-toggle>
</div>
```


## Factories

When you use the factory to create objects, the factory will take care of proper object registration that are necessary such that features like reflection and the OCL operations ``allInstances()`` will work properly.
For example, you call ``ConferenceFactoryImpl.eINSTANCE.createTalk()`` to create a new ``Talk`` object (instead using the ``new`` operator).
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


## Object Constraint Language (OCL)
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
    (t.speakers.includes(other) ||
    t.attendees.includes(other)
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


# Installation, Building and Running
## CouchDB
As explained in the beginning, the app stores the model in a PouchDB and synchronizes it with a remote CouchDB.
When you start the app the first time, it creates the PouchDB and imports the contents from a CSV file.
The app even runs out of the box without the CouchDB.

If you want to use the CouchDB synchronization here is what you have to do:
By default, the app expects the remote CouchDB to be available at http://localhost:5984 and that the database *eclipsecon* exists.
You can install CouchDB on your local computer by following the [CouchDB installation instructions](http://docs.couchdb.org/en/stable/install/index.html).
Once you have installed it, you can open Fauxton, the user interface of CouchDB that is available at http://localhost:5984/_utils/ to create the database *eclipsecon*.

When you want to connect to the CouchDB from the Tabris app be sure that you configure a network address that is accessible from the mobile device and that you have proper firewall settings (port 5984). 

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

The Tabris documentation has a detailed section about the [Tabris build process](https://docs.tabris.com/latest/build.html).

You can install the Tabris command line tools via npm:

```bash
npm install -g tabris-cli
```

Take a look at the cordova configuration file ``cordova/config.xml``.
In order to use the PouchDB SQLite adapter you need the cordova plugin ``cordova-plugin-sqlite-2``.

```xml
<plugin name="cordova-plugin-sqlite-2" spec="^1.0.5" />
```

To allow your app to make XHR calls to the remote CouchDB you need the plugin ``cordova-plugin-whitelist``.
```xml
<plugin name="cordova-plugin-whitelist" spec="^1.3.3" />
```
In addition, you need to configure the network access:

```xml
<access origin="*" />
```

To build your app, enter the following command in the command line:
```bash
tabris build android
```
