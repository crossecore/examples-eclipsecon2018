import * as PouchDB from 'pouchdb/dist/pouchdb';
import * as cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite';

import {AlertDialog, ui, Button, TextView, TextInput, Picker, CollectionView, Composite, ImageView} from 'tabris';

import {ConferencePackageImpl} from "./conference/ConferencePackageImpl";
import {ConferenceFactoryImpl} from "./conference/ConferenceFactoryImpl";
import {ConferenceImpl} from "./conference/ConferenceImpl";
import {Conference} from "./conference/Conference";
import {Person} from "./conference/Person";
import {OrderedSet} from "./ecore/OrderedSet";
import {Talk} from "./conference/Talk";
import {JsonResource} from "./ecore/JsonResource";
import {Adapter} from "./ecore/Adapter";
import {Notification} from "./ecore/Notification";
import {BasicEObjectImpl} from "./ecore/BasicEObjectImpl";


class Controller implements Adapter {
    private conference = ConferenceFactoryImpl.eINSTANCE.createConference();
    private jsonResource = new JsonResource(ConferencePackageImpl.eINSTANCE, ConferenceFactoryImpl.eINSTANCE);
    private filteredTalks = new OrderedSet<Talk>();
    private user = ConferenceFactoryImpl.eINSTANCE.createPerson();
    private picker = null as Picker;
    private collection = null as CollectionView;
    private pouchdb = new PouchDB('http://localhost:5984/eclipsecon');

    init = () => {
        this.synchronize();
        this.createUI();
    }


    synchronize = () => {

        PouchDB.plugin(cordovaSqlitePlugin);
        const user_db = new PouchDB('user', {adapter: 'cordova-sqlite'});

        this.pouchdb.allDocs({
            include_docs: true,
            attachments: true
        }).then((result) => {

            for (let row of result.rows) {

                let eobject = this.jsonResource.fromJson(row.doc);

                if (eobject instanceof ConferenceImpl) {
                    this.conference = eobject as Conference;
                    this.filteredTalks = this.conference.talks;
                    //this.collection.load(this.filteredTalks.size());
                    //this.picker.itemCount = this.conference.tracks.size();
                }

            }

            this.createUI();

            return user_db.allDocs({
                include_docs: true,
                attachments: true
            });

        })
        .then((result) => {

            if (result !== undefined) {
                if (result.total_rows === 0) {

                    this.user = ConferenceFactoryImpl.eINSTANCE.createPerson();

                    user_db.post(this.jsonResource.asJson(this.user));
                    this.pouchdb.post(this.jsonResource.asJson(this.user));
                }
                else {

                    return this.pouchdb.get(result.rows[0].id);

                }
            }

        })
        .then((doc) => {

            if (doc !== undefined) {
                this.user = this.jsonResource.getById(doc._id) as Person;
                this.user.eAdapters().push(this);
            }

        })
        .catch((err) => {
            console.log(err);
        });

    }

    createUI = () => {
        this.picker = new Picker({
            left: 20, top: 20, right: 20,
            itemCount: this.conference.tracks.size(),
            itemText: (index) => this.conference.tracks.at(index).name,
            selectionIndex: 1
        }).appendTo(ui.contentView);

        this.picker.on('select', ({index}) => {
            let filterTrack = this.conference.tracks.at(index);
            this.filteredTalks = filterTrack.talks;
            this.collection.load(this.filteredTalks.size());
        });


        this.collection = new CollectionView({
            left: 0, top: 'prev() 20', right: 0, bottom: 0,
            itemCount: this.filteredTalks.size(),
            cellHeight: 100,
            createCell: () => {
                let cell = new Composite();

                new TextView({
                    left: 30, top: 'prev() 16', right: 30,
                    alignment: 'left'
                }).appendTo(cell);

                return cell;
            },
            updateCell: (cell, index) => {
                let talk = this.filteredTalks.at(index);

                cell.apply({
                    TextView: {text: talk.title}
                });

                if (this.user.attends.excludes(talk)) {

                    cell.background = '#ffffff';

                }
                else {
                    cell.background = '#b9f6ca';
                }

            }
        }).on('select', ({index}) => {

            let talk = this.filteredTalks.at(index);
            if (this.user.attends.excludes(talk)) {
                this.user.attends.add(talk);
            }
            else {
                this.user.attends.remove(talk);
            }

            this.collection.refresh(index);

        })
            .appendTo(ui.contentView);

    }

    notifyChanged(notification: Notification): void {

        let notifier = notification.getNotifier();

        if (notifier !== null) {
            let newDoc = this.jsonResource.asJson(notifier);

            this.pouchdb.get((notifier as BasicEObjectImpl)._uuid)
                .then((currentDoc) => {
                    newDoc["_rev"] = currentDoc._rev;

                    return this.pouchdb.put(newDoc);
                })
                .then((response) => {
                    console.log(response);
                }).catch((err) => {
                new AlertDialog({
                    title: 'Info',
                    message: 'Error while putting',
                    buttons: {
                        ok: 'Ok'
                    }
                }).open();
                console.log(err);
            });
        }
    }
}

new Controller().init();

