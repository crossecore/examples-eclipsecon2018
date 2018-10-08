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

```typescript
for(let eattribute of eclass.eAllAttributes) {

  i++;
}
```

## Factories

You must use the generated factory to create instances of your model instead of using the ``new`` operator. For example you should call ``ConferenceFactoryImpl.eINSTANCE.createTalk()`` instead of ``new TalkImpl()``. The factory takes care that all objects are registered in the system and that the OCL operation ``allInstances()`` will work properly.

```typescript
let talk: Talk = ConferenceFactoryImpl.eINSTANCE.createTalk();
```

## Referential Integrity (Bi-directional Associations)
Person attends Talk <-> Talk attendees Person

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

The query ``meetPersonAt(other:Person):Talk`` returns all Talks where Person ``self`` and ``other`` are in the same room, no matter if they are a speaker or attendee.


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
