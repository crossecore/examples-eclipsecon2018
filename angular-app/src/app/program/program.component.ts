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

    console.log(notification);

    switch(notification.getEventType()){
      case NotificationImpl.ADD: console.log("ADD");break;
      case NotificationImpl.REMOVE: console.log("REMOVE");break;
      case NotificationImpl.SET: console.log("SET");break;
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

    //this.conference.eAdapters().push(new MyAdapter());

    this.user = ConferenceFactoryImpl.eINSTANCE.createPerson();

    this.efactory = ConferenceFactoryImpl.eINSTANCE;
    this.epackage = ConferencePackageImpl.eINSTANCE;

    this.resolveJobs = {};
    this.eobjectRegistry = {};

    var closure = this;

    var conference = this.conference;

    this.synchronize();



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

            var speaker = ConferenceFactoryImpl.eINSTANCE.createPerson();


            if(rawSpeakers!==undefined){
              var index = rawSpeakers.indexOf('(');

              if(index > -1){
                var name = rawSpeakers.substring(0, index - 1);
                var parts = name.split(' ');
                speaker.firstName = parts[0];
                speaker.lastName = parts[1];
                talk.speakers.push(speaker);
              }

              speaker.worksFor = rawOrganization;
            }

            if(rawTrack!==undefined){


              var track:Track = null;



              if(conference.tracks.select(t => t.name ===rawTrack).isEmpty()){
                track = ConferenceFactoryImpl.eINSTANCE.createTrack();
                track.name = rawTrack;
                conference.tracks.add(track);
              }
              else{
                track = conference.tracks.select(t=>t.name === rawTrack).any(t=>true);
              }

              talk.track = track;

            }

            if(rawTime!==undefined){
              let match = rawTime.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|Sepetember|October|November|December) (\d{1,2}), (\d{4}) - (\d{2}):(\d{2}) to (\d{2}):(\d{2})/);

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


            closure.conference.talks.add(talk);

          }

          closure.filteredTalks = conference.talks;
        }

        //closure.importIntoDataBase();
      }




    });

  }


  synchronize(){

    let closure = this;
    const local_db = new PouchDB('eclipsecon');

    PouchDB.sync('eclipsecon', 'http://localhost:5984/eclipsecon/', {
      live: true,
      retry: true
    }).on('change', function (info) {


      //TODO only direction 'pull'
      info.change.docs;



    }).on('paused', function (err) {

      //TODO do full loading just once:


      local_db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {

        for(let row of result.rows){

          let doc = row.doc;

          let classifierId = doc['type'];

          let eclassifier = closure.epackage.getEClassifier(classifierId);

          if(eclassifier instanceof EClassImpl){

            let eclass = eclassifier as EClass;

            let eobject = closure.efactory.create(eclass);

            (eobject as BasicEObjectImpl)._uuid = doc._id;

            closure.eobjectRegistry[doc._id] = eobject;


            closure.addEStructuralFeatures(eobject, doc);


            if(closure.resolveJobs[doc._id]!==undefined){

              while(closure.resolveJobs[doc._id].length>0){


                let job = closure.resolveJobs[doc._id].pop();

                if(job.eStructuralFeature.many){

                  //remember: eGet call by reference
                  let x = job.eObject.eGet(job.eStructuralFeature) as AbstractCollection<EObject>;
                  x.add(eobject);
                }
                else{
                  job.eObject.eSet(job.eStructuralFeature, eobject);
                }


              }

            }
          }

        }

        for(let uuid in closure.resolveJobs){

          if(closure.resolveJobs[uuid].length>0){
            console.log(uuid + 'not resolved: '+closure.resolveJobs[uuid].length);
          }
        }

      }).catch(function (err) {
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

  addEStructuralFeatures(eobject:EObject, document:any){

    for(let key in document){

      var estructuralfeature = eobject.eClass().getEStructuralFeature(key);

      if (estructuralfeature instanceof EAttributeImpl)
      {
        if (!estructuralfeature.many)
        {
          var etype = estructuralfeature.eType;
          var value = document[key];

          //TODO fix nsURI
          if (etype.ePackage.nsURI === "http://www.eclipse.org/emf/2002/Ecore" || true)
          {

            if (etype.name == "EBigDecimal")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EBigInteger")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EBoolean")
            {
              eobject.eSet(estructuralfeature, value == "true" ? true : false);
            }
            else if (etype.name == "EBooleanObject")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EByteArray")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EByteObject")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EChar")
            {
              eobject.eSet(estructuralfeature, value[0]);
            }
            else if (etype.name == "ECharacterObject")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EDateEDiagnosticChain")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EDiagnosticChain")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EDouble")
            {
              eobject.eSet(estructuralfeature, +value);
            }
            else if (etype.name == "EDoubleObject")
            {
              throw new Error('not implemented');
            }
            //EEList
            //EEnumerator
            //EFeatureMap
            //EFeatureMapEntry
            else if (etype.name == "EFloat")
            {
              eobject.eSet(estructuralfeature, +value);
            }
            else if (etype.name == "EFloatObject")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EInt")
            {
              eobject.eSet(estructuralfeature, +value);
            }
            else if (etype.name == "EIntegerObject")
            {
              throw new Error('not implemented');
            }
            //EJavaClass
            //EJavaObject
            else if (etype.name == "ELong")
            {
              eobject.eSet(estructuralfeature, +value);
            }
            else if (etype.name == "ELongObject")
            {
              throw new Error('not implemented');
            }
            //EMap
            //EResource
            //EResourceSet
            else if (etype.name == "EShort")
            {
              eobject.eSet(estructuralfeature, +value);
            }
            else if (etype.name == "EShortObject")
            {
              throw new Error('not implemented');
            }
            else if (etype.name == "EString")
            {
              eobject.eSet(estructuralfeature, value);
            }
            //ETreeIterator
            //EInvocationTargetException

          }
          else
          {
            //custom package


          }

        }
        else if (estructuralfeature.many)
        {

        }
        else
        {

        }
      }
    else if (estructuralfeature instanceof EReferenceImpl)
      {

        if(estructuralfeature.many){

          var values = document[key];

          for(let value of values){
            this.resolve(eobject, estructuralfeature,value);
          }

        }
        else{

          this.resolve(eobject, estructuralfeature,document[key]);

        }

      }

    }

  }

  resolve(eobject:EObject, estructuralfeature:EStructuralFeature, value:string){

    if(this.eobjectRegistry[value]!==undefined){

      if(estructuralfeature.many){

        //TODO eGet is call by reference
        let items = eobject.eGet(estructuralfeature) as AbstractCollection<EObject>;
        items.add(this.eobjectRegistry[value]);

      }
      else{
        eobject.eSet(estructuralfeature, this.eobjectRegistry[value]);
      }


    }
    else{

      let resolveJob: ResolveJob = {
        "eObject": eobject,
        "eStructuralFeature": estructuralfeature,
        "value": value
      };

      if(this.resolveJobs[value]===undefined){
        this.resolveJobs[value] = new Array<ResolveJob>();
      }

      this.resolveJobs[value].push(resolveJob);
    }
  }

  importIntoDataBase(){
    const db = new PouchDB('http://localhost:5984/eclipsecon/');


    db.info().then(function (result) {
      if(result.doc_count === 0){

      }
    }).catch(function (err) {
      console.log(err);
    });


    let jsonResource:JsonResource = new JsonResource();


    let docs = new Array<any>();
    let treeIterator = new ContentTreeIterator(this.conference);

    //TODO should be conference.eContents.iterator or so
    while(treeIterator.hasNext()){

      let next = treeIterator.next();


      if(next!=null){

        let json = jsonResource.asJson(next.value);

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
