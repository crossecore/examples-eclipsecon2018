
/*
(window as any).global = window;
(window as any).process = {};
(window as any).process.nextTick = setTimeout;


import * as corejs from 'core-js';
*/

import * as PouchDB from 'pouchdb/dist/pouchdb';
import * as cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite';

import {AlertDialog, ui, Button, TextView, TextInput} from 'tabris';


import {EcorePackageImpl} from "./ecore";


/*
let db = new PouchDB('mydb',{

    adapter: 'websql' // Force adapter for SQLite plugin
});

*/


let eclass = EcorePackageImpl.eINSTANCE.getEClass();


var i = 0;
for(let eattribute of eclass.eAllAttributes) {
  // TODO assert ecore package
  //if(eattribute.eType.getClassifierID() === EcorePackageImpl.ESTRING || true) { // FIXME
  if(true) {
    let input = new TextInput({
        top: 'prev() 20',
        left: '20%',
        right: '20%',
        message: eattribute.name
    }).appendTo(ui.contentView);

  }
  i++;
}

function onDeviceReady() {

}

// The below, or something like it, is necessary
// to use PouchDB functionality!
document.addEventListener("deviceready", onDeviceReady, false);


new Button({
    left: 10, top: 'prev() 20',
    text: 'Button'
}).on('select', () => {

    console.log(PouchDB);
    console.log(cordovaSqlitePlugin);
    PouchDB.plugin(cordovaSqlitePlugin);
    let db = new PouchDB("helloworld",{adapter:'cordova-sqlite'});
    // okay, now we have our database

    db.put({
        _id: 'mydoc',
        title: 'Heroes'
    }).then(function (response) {

        console.log(response);

        new AlertDialog({
            title: 'Info',
            message: 'Document saved',
            buttons: {
                ok: 'Ok'
            }
        }).open();

    }).catch(function (err) {
        new AlertDialog({
            title: 'Info',
            message: 'Error',
            buttons: {
                ok: 'Ok'
            }
        }).open();

        console.log(err);
    });
}).appendTo(ui.contentView);
