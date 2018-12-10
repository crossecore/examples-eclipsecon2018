import { Component, OnInit } from '@angular/core';

import {Talk} from 'conference/Talk';
import {Track} from 'conference/Track';
import {Person} from 'conference/Person';
import {Conference} from 'conference/Conference';
import {ConferenceFactoryImpl} from 'conference/ConferenceFactoryImpl';

import * as Papa from 'papaparse';
import {Adapter} from 'ecore/Adapter';
import {Notification} from 'ecore/Notification';
import {NotificationImpl} from 'ecore/NotificationImpl';
import PouchDB from 'pouchdb';
import {JsonResource} from 'ecore/JsonResource';
import {ContentTreeIterator} from 'ecore/ContentTreeIterator';
import {EObject} from 'ecore/EObject';
import {EPackage} from 'ecore/EPackage';
import {EFactory} from 'ecore/EFactory';
import {ConferencePackageImpl} from '../../conference/ConferencePackageImpl';
import {EClassImpl} from 'ecore/EClassImpl';
import {EClass} from 'ecore/EClass';

import {EAttributeImpl} from 'ecore/EAttributeImpl';
import {EReferenceImpl} from 'ecore/EReferenceImpl';
import {EStructuralFeature} from 'ecore/EStructuralFeature';
import {BasicEObjectImpl} from 'ecore/BasicEObjectImpl';
import {AbstractCollection} from 'ecore/AbstractCollection';
import {ConferenceImpl} from 'conference/ConferenceImpl';
import {Organization} from 'conference/Organization';
import {ENotificationImpl} from 'ecore/ENotificationImpl';
import {MatSnackBar} from '@angular/material';



interface EObjectRegistry{
  [index:string]:EObject;
}

interface ResolveJobRegistry{
  [index:string]:Array<ResolveJob>;
}

interface ResolveJob{
  eObject:EObject;
  eStructuralFeature:EStructuralFeature;
  value:string;
}


class MyAdapter implements Adapter{


  notifyChanged(notification:Notification){


    let notifier = notification.getNotifier() as EObject;

    if(notifier!==null){

      var enotification = notification as ENotificationImpl;
      let feature = enotification.getFeature();
      let eventType = enotification.getEventType();
      let newValue = enotification.getNewValue();

      let newDoc = new JsonResource(ConferencePackageImpl.eINSTANCE, ConferenceFactoryImpl.eINSTANCE).asJson(notifier);

      const local_db = new PouchDB('eclipsecon');

      local_db.get((notifier as BasicEObjectImpl)._uuid)
        .then((currentDoc)=>{
          newDoc["_rev"] = currentDoc._rev;

          return local_db.put(newDoc);
        })
        .then( (response)=> {
        console.log(response);
      }).catch( (err)=> {
        console.log(err);
      });
    }

  }
}


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  filteredTalks:Array<Talk>;
  filteredTrack:Track;
  conference: Conference;
  user:Person;

  epackage:EPackage;
  efactory:EFactory;

  resolveJobs:ResolveJobRegistry;
  eobjectRegistry:EObjectRegistry;

  localDB;
  remoteDB;

  remoteHasContents:boolean;
  localHasContents:boolean;
  hasRemote:boolean = false;

  initialized:boolean = false;

  jsonResource:JsonResource;

  toggleTrack(track: Track, event) {

    if(this.filteredTrack === track){
      this.filteredTrack = null;
      this.filteredTalks = this.conference.talks;

    }
    else{
      this.filteredTrack = track;
      this.filteredTalks = this.filteredTrack.talks;

    }

  }

  toggleAttending(talk: Talk) {

    if(!this.user.attends.containsX(talk)){
      this.user.attends.add(talk);
    }
    else{
      this.user.attends.remove(talk);
    }
  }

  constructor(public snackBar: MatSnackBar) {

    this.conference = ConferenceFactoryImpl.eINSTANCE.createConference();
    this.jsonResource = new JsonResource(ConferencePackageImpl.eINSTANCE, ConferenceFactoryImpl.eINSTANCE);

    this.user = ConferenceFactoryImpl.eINSTANCE.createPerson();


    this.efactory = ConferenceFactoryImpl.eINSTANCE;
    this.epackage = ConferencePackageImpl.eINSTANCE;

    this.resolveJobs = {};
    this.eobjectRegistry = {};

    this.localDB = new PouchDB("eclipsecon");
    this.remoteDB = new PouchDB("http://localhost:5984/eclipsecon");
    this.remoteHasContents = false;

    this.load();

  }

  protected load(){

    this.localDB.info().then((result)=> {
      if(result.doc_count === 0){
        this.localHasContents = false;
      }
      else{
        this.localHasContents = true;
      }

      return this.remoteDB.info();

    }).then((result)=> {
        this.hasRemote = true;
        if(result.doc_count === 0){
          this.remoteHasContents = false;
        }
        else{
          this.remoteHasContents = true;
        }

        if(!this.localHasContents && !this.remoteHasContents){

          this.loadCSV();

        }
        else{
          this.synchronize();
        }


      })
      .catch((err)=> {


        this.snackBar.open(`Remote database ${this.remoteDB.name} not available. Using local.`, "Dismiss", {
          duration: 4000,
        });
        if(!this.localHasContents){
          this.loadCSV();
        }
        else{
          this.loadDatabase();
        }

    });


  }

  protected loadDatabase(){



    const user_db = new PouchDB('user');

    this.initialized = true;
    this.localDB.allDocs({
      include_docs: true,
      attachments: true
    }).then( (result)=> {

      for (let row of result.rows) {

        let eobject = this.jsonResource.fromJson(row.doc);

        if (eobject instanceof ConferenceImpl) {
          this.conference = eobject as Conference;
          this.filteredTalks = this.conference.talks;
        }

      }
      return user_db.allDocs({
        include_docs: true,
        attachments: true
      });


    })
      .then( (result)=> {

        if (result !== undefined) {
          if (result.total_rows === 0) {

            this.user = ConferenceFactoryImpl.eINSTANCE.createPerson();

            user_db.post(this.jsonResource.asJson(this.user));
            this.localDB.post(this.jsonResource.asJson(this.user));
          }
          else {

            return this.localDB.get(result.rows[0].id);

          }
        }

      })
      .then( (doc)=> {

        if (doc !== undefined) {
          this.user = this.jsonResource.getById(doc._id) as Person;
          this.user.eAdapters().push(new MyAdapter());
        }

      })
      .catch( (err)=> {
        console.log(err);
      });
  }

  protected loadCSV(){


    Papa.parse('assets/eclipsecon.csv', {
      download: true,
      header	: true,
      complete: (results)=> {
        console.log(results);

        for(var row of results.data){
          //"Title","Track","Speaker(s)","Organization","Room","Time"
          let rawTitle = row["Title"];//[0];
          let rawTrack = row["Track"];//[1];
          let rawSpeakers = row["Speaker(s)"];
          let rawOrganization = row["Organization"];
          let rawRoom = row["Room"];
          let rawTime = row["Time"];

          if(rawTitle){

            let talk = ConferenceFactoryImpl.eINSTANCE.createTalk();
            //"Building Cloud and Desktop IDEs with Theia","Web & Cloud Development","Anton Kosyakov (TypeFox)","TypeFox","Bürgersaal 2","Tuesday, October 23, 2018 - 09:00 to 12:00"

            talk.title = rawTitle;


            let organization:Organization = null;
            if(rawOrganization!==undefined){

              if(this.conference.organizations.select(a => a.name === rawOrganization).isEmpty()){

                organization = ConferenceFactoryImpl.eINSTANCE.createOrganization();
                organization.name = rawOrganization;

                this.conference.organizations.add(organization);

              }
              else{
                organization = this.conference.organizations.select(a => a.name === rawOrganization).any(t=>true);
              }
            }

            if(rawSpeakers!==undefined){
              let index = rawSpeakers.indexOf('(');

              if(index > -1){
                let name = rawSpeakers.substring(0, index - 1);
                let parts = name.split(' ');
                let firstName = parts[0];
                let lastName = parts[1];


                let speaker:Person = null;
                if(this.conference.attendees.select(a => a.firstName === firstName && a.lastName ===lastName).isEmpty()){

                  speaker = ConferenceFactoryImpl.eINSTANCE.createPerson();
                  speaker.firstName = firstName;
                  speaker.lastName = lastName;
                  this.conference.attendees.add(speaker);

                }
                else{
                  speaker = this.conference.attendees.select(a => a.firstName === firstName && a.lastName ===lastName).any(t=>true);
                }
                if(organization!==null){
                  speaker.worksFor = organization;
                }
                talk.speakers.add(speaker);
                this.conference.talks.add(talk);
              }

            }

            if(rawTrack!==undefined){


              var track:Track = null;



              if(this.conference.tracks.select(t => t.name ===rawTrack).isEmpty()){
                track = ConferenceFactoryImpl.eINSTANCE.createTrack();
                track.name = rawTrack;
                this.conference.tracks.add(track);
              }
              else{
                track = this.conference.tracks.select(t=>t.name === rawTrack).any(t=>true);
              }

              talk.track = track;

            }

            if(rawTime!==undefined){
              let match = rawTime.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4}) - (\d{2}):(\d{2}) to (\d{2}):(\d{2})/);

              if(match !== null){
                let dayofweek = match[1];
                let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(match[2]);
                let day = +match[3];
                let year = +match[4];
                let startHour = +match[5];
                let startMinute = +match[6];
                let endHour = +match[7];
                let endMinute = +match[8];
                // "Tuesday, October 23, 2018 - 14:30 to 15:05"
                talk.timeBegin = new Date(year, month, day, startHour, startMinute);
                talk.timeEnd = new Date(year, month, day, endHour, endMinute);
              }
            }


          }


        }

        this.importIntoDataBase();

      }

    });
  }


  synchronize(){

    const local_db = new PouchDB('eclipsecon');

    PouchDB.sync('eclipsecon', 'http://localhost:5984/eclipsecon', {
      live: true,
      retry: true
    }).on('change',  (info)=> {


    }).on('paused',  (err)=> {

      this.snackBar.open("Synchronization completed", "Nice", {
        duration: 2000,
      });
      if(!this.initialized) {
        this.loadDatabase();
      }


    }).on('active',  ()=> {
      // replicate resumed (e.g. new changes replicating, user went back online)
    }).on('denied',  (err)=> {
      // a document failed to replicate (e.g. due to permissions)
    }).on('complete',  (info)=> {
      // handle complete
    }).on('error',  (err)=> {
      // handle error
    });


  }


  importIntoDataBase(){

    let docs = new Array<any>();
    let treeIterator = new ContentTreeIterator(this.conference);

    //TODO should be conference.eContents.iterator or so
    while(treeIterator.hasNext()){

      let next = treeIterator.next();

      if(next!=null){

        let json = this.jsonResource.asJson(next.value);

        docs.push(json);


      }

    }

    this.localDB.bulkDocs(docs).then( (result)=> {
      if(this.hasRemote){
        this.synchronize()
      }
      else{
        this.loadDatabase();
      }
    }).catch( (err)=> {
      console.log(err);
    });


  }

  ngOnInit() {
  }

}
