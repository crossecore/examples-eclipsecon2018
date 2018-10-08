import {Component, OnInit} from '@angular/core';
import {MatButtonToggleModule, MatSnackBar} from '@angular/material';

import {ConferenceFactoryImpl} from 'conference/ConferenceFactoryImpl';
import {Talk} from 'conference/Talk';
import {Track} from 'conference/Track';
import {Person} from 'conference/Person';
import {Conference} from 'conference/Conference';

import * as Papa from 'papaparse';

//import PouchDB from 'pouchdb';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //@ViewChild('group') group: MatButtonToggleModule;

  talks: Array<Talk>;
  conference: Conference;
  user:Person;
  filteredTalks:Array<Talk>;
  filteredTrack:Track;
  isAndroid: boolean;

  constructor(public snackBar: MatSnackBar) {


    this.talks = new Array<Talk>();

    this.conference = ConferenceFactoryImpl.eINSTANCE.createConference();

    this.user = ConferenceFactoryImpl.eINSTANCE.createPerson();


    this.isAndroid = navigator.userAgent.toLowerCase().indexOf('android')>-1;

    var closure = this;

    var conference = this.conference;


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

            closure.talks.push(talk)
            conference.talks.add(talk);

          }

          closure.filteredTalks = conference.talks;
        }
      }


    });


  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  toggleTrack(track: Track, event) {


    if(this.filteredTrack === track){
      this.filteredTrack = null;
      this.filteredTalks = this.conference.talks;

      //event.value = null;
      //event.source.selected = false;




    }
    else{
      this.filteredTrack = track;
      this.filteredTalks = this.conference.talks.select(t=> t.track.name === track.name);



    }

  }

  toggleChange(group, event) {
    let toggle = event.source;
    if (toggle) {


      group.value = [toggle.value];


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

  ngOnInit() {

    /*
    const db = new PouchDB('helloworld');
    // okay, now we have our database



    db.put({
      _id: 'mydoc',
      title: 'Heroes'
    }).then(function (response) {

      console.log(response);

      //this.snackBar.open('put complete');

    }).catch(function (err) {

      console.log(err);
      //this.snackBar.open('put not complete');
    });
    */
  }


}
