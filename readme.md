# App Architecture

This tutorial presents how CrossEcore TypeScript can be used in a browser based [Angular](https://angular.io/) app with the [Angular Material](https://v5.material.angular.io/) user interface or as a hybrid app with a [Tabris](https://tabris.com/) user interface.
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

## Switches

## Notifications

## Reflection

This example shows how to use the Ecore reflection API to realize a dynamic property editor. From a given object instance, the superordinate ``EClass`` is determined. It iterates over all its ``EAttributes`` (even inherited) and renders dynamically UI elements that correspond to the ``eType`` of the respective ``EAttribute``.


## Factories

You must use the generated factory to create instances of your model instead of using the ``new`` operator. For example you should call ``ConferenceFactoryImpl.eINSTANCE.createTalk()`` instead of ``new TalkImpl()``. The factory takes care that all objects are registered in the system and that the OCL operation ``allInstances()`` will work properly.

```typescript
let talk: Talk = ConferenceFactoryImpl.eINSTANCE.createTalk();
```

## Referential Integrity (Bi-directional Associations)

A ``Person`` ``attends`` ``Talks`` and ``Talks`` have multiple ``Persons`` that ``attend``.
Whenever a ``Talk`` is added to the list of ``Talks`` a ``Persons`` attends, this ``Person`` needs to be added to the list of ``attendees`` of this ``Talk`` to keep this bi-directional association consistent.
With Ecore, one can use the ``eOpposite`` feature to model such kind of bi-directional association.
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


## OCL
### Validation

The OCL invariant ``noConflicts`` asserts that all talks of a conference are not temporally overlapping.

```javascript
invariant noConflict:
self.talks
  ->forAll(t1:Talk | self.talks
    ->forAll(t2:Talk|
      (t1.timeBegin < t2.timeBegin and
      t1.timeEnd <= t2.timeBegin)
      or
      (t2.timeBegin < t1.timeBegin
      and t2.timeEnd <= t1.timeBegin)
    )
  );
```

### Queries

The query ``meetPersonAt(other:Person):Talk`` returns all ``Talks`` where ``Persons`` ``self`` and ``other`` are in the same ``Room``, no matter if they are a ``speaker`` or ``attendee``.


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
### Derived Attributes

A ``Conference`` consists of ``Talks`` and ``Tracks``.
A ``Track`` has multiple ``Talks``.
The other way round, a ``Talk`` is assigned to a ``Track``.
This means the connection of a ``Conference`` to a certain ``Talk`` *self* needs to be maintained as well as a connection between a ``Track`` and ``Talk`` *t*.
To store *self* redundantly in the model unnesessarily increases memory consumption and requires that copies of *self* are kept consistent.

Derived attributes determine by a calculation rule. The calculation rule is an OCL navigating expression that evaluates to an primitive value, an object, or a collection. The navigating expression are a simple form of model queries that do not have additional call arguments.

The OCL expression that selects all ``Talks`` assigned to a ``Track`` looks like this:

```javascript
self.conference.talks->select(t:Talk|t.track = self);
```

The variable *self* points to a given ``Talk``.
The expression navigates over the ``Conference`` the ``Talk`` is contained in.
Then it iterates over all the ``Conference``'s ``Talks`` and selects the ``Talks`` whose ``Track`` is *self*.


# Building
## Angular App
Install [Node.js](https://nodejs.org).
Open a command line interface and install Angular CLI via the Node.js Package Manager (npm).


```bash
npm install angular-cli -g
```
Change the working directory to the *angular-app/*.

```bash
cd angular-app
npm install
```

```bash
ng serve --open
```
