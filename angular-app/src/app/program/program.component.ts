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
import {Organization} from '../../conference/Organization';



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


    let notifier = notification.getNotifier();

    if(notifier!==null){
      let newDoc = new JsonResource(ConferencePackageImpl.eINSTANCE, ConferenceFactoryImpl.eINSTANCE).asJson(notifier);

      const local_db = new PouchDB('eclipsecon');


      local_db.get((notifier as BasicEObjectImpl)._uuid)
        .then(function(currentDoc){
          newDoc["_rev"] = currentDoc._rev;

          return local_db.put(newDoc);
        })
        .then(function (response) {
        console.log(response);
      }).catch(function (err) {
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

  initialized:boolean = false;

  jsonResource:JsonResource;

  toggleTrack(track: Track, event) {


    if(this.filteredTrack === track){
      this.filteredTrack = null;
      this.filteredTalks = this.conference.talks;

    }
    else{
      this.filteredTrack = track;
      this.filteredTalks = this.conference.talks.select(t=> t.track.name === track.name);

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

  constructor() {

    this.conference = ConferenceFactoryImpl.eINSTANCE.createConference();
    this.jsonResource = new JsonResource(ConferencePackageImpl.eINSTANCE, ConferenceFactoryImpl.eINSTANCE);

    this.user = ConferenceFactoryImpl.eINSTANCE.createPerson();


    this.efactory = ConferenceFactoryImpl.eINSTANCE;
    this.epackage = ConferencePackageImpl.eINSTANCE;

    this.resolveJobs = {};
    this.eobjectRegistry = {};

    var closure = this;



    this.synchronize();

/*

    Papa.parse('assets/eclipsecon.csv', {
      download: true,
      header	: true,
      complete: function(results) {
        console.log(results);

        for(var row of results.data){
          //"Title","Track","Speaker(s)","Organization","Room","Time"
          var rawTitle = row["Title"];//[0];
          var rawTrack = row["Track"];//[1];
          var rawSpeakers = row["Speaker(s)"];
          var rawOrganization = row["Organization"];
          var rawRoom = row["Room"];
          var rawTime = row["Time"];

          if(rawTitle){



            var talk = ConferenceFactoryImpl.eINSTANCE.createTalk();
            //"Building Cloud and Desktop IDEs with Theia","Web & Cloud Development","Anton Kosyakov (TypeFox)","TypeFox","Bürgersaal 2","Tuesday, October 23, 2018 - 09:00 to 12:00"

            talk.title = rawTitle;


            var organization:Organization = null;
            if(rawOrganization!==undefined){

              if(closure.conference.organizations.select(a => a.name === rawOrganization).isEmpty()){

                organization = ConferenceFactoryImpl.eINSTANCE.createOrganization();
                organization.name = rawOrganization;

                closure.conference.organizations.add(organization);

              }
              else{
                organization = closure.conference.organizations.select(a => a.name === rawOrganization).any(t=>true);
              }
            }

            if(rawSpeakers!==undefined){
              var index = rawSpeakers.indexOf('(');

              if(index > -1){
                var name = rawSpeakers.substring(0, index - 1);
                var parts = name.split(' ');
                var firstName = parts[0];
                var lastName = parts[1];


                var speaker:Person = null;
                if(closure.conference.attendees.select(a => a.firstName === firstName && a.lastName ===lastName).isEmpty()){

                  speaker = ConferenceFactoryImpl.eINSTANCE.createPerson();
                  speaker.firstName = firstName;
                  speaker.lastName = lastName;
                  closure.conference.attendees.add(speaker);

                }
                else{
                  speaker = closure.conference.attendees.select(a => a.firstName === firstName && a.lastName ===lastName).any(t=>true);
                }

                talk.speakers.add(speaker);
                closure.conference.talks.add(talk);
              }

              if(organization!==null){
                speaker.worksFor = organization;
              }

            }

            if(rawTrack!==undefined){


              var track:Track = null;



              if(closure.conference.tracks.select(t => t.name ===rawTrack).isEmpty()){
                track = ConferenceFactoryImpl.eINSTANCE.createTrack();
                track.name = rawTrack;
                closure.conference.tracks.add(track);
              }
              else{
                track = closure.conference.tracks.select(t=>t.name === rawTrack).any(t=>true);
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

        closure.importIntoDataBase();
      }




    });

*/

  }


  synchronize(){

    let closure = this;
    const local_db = new PouchDB('eclipsecon');

    const user_db = new PouchDB('user');


    PouchDB.sync('eclipsecon', 'http://localhost:5984/eclipsecon/', {
      live: true,
      retry: true
    }).on('change', function (info) {


    }).on('paused', function (err) {

      //TODO do full loading just once:

      local_db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {

        if(!closure.initialized){

          closure.initialized = true;
          for (let row of result.rows) {

            let eobject = closure.jsonResource.fromJson(row.doc);

            if(eobject instanceof ConferenceImpl){
              closure.conference = eobject as Conference;
              closure.filteredTalks = closure.conference.talks;
            }

          }
          return user_db.allDocs({
            include_docs: true,
            attachments: true
          });

        }


      })
      .then(function (result) {

        if(result!==undefined){
          if(result.total_rows===0){

            closure.user = ConferenceFactoryImpl.eINSTANCE.createPerson();

            user_db.post(closure.jsonResource.asJson(closure.user));
            local_db.post(closure.jsonResource.asJson(closure.user));
          }
          else{

            return local_db.get(result.rows[0].id);

          }
        }

      })
      .then(function(doc){

        if(doc!==undefined){
          closure.user = closure.jsonResource.getById(doc._id) as Person;
          closure.user.eAdapters().push(new MyAdapter());
        }

      })
      .catch(function (err) {
        console.log(err);
      });


    }).on('active', function () {
      // replicate resumed (e.g. new changes replicating, user went back online)
    }).on('denied', function (err) {
      // a document failed to replicate (e.g. due to permissions)
    }).on('complete', function (info) {
      // handle complete
    }).on('error', function (err) {
      // handle error
    });

  }


  importIntoDataBase(){
    const db = new PouchDB('http://localhost:5984/eclipsecon/');

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

    db.bulkDocs(docs).then(function (result) {
      // handle result
    }).catch(function (err) {
      console.log(err);
    });


  }

  ngOnInit() {
  }

}
