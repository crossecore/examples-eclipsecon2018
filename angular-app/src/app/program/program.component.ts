import { Component, OnInit } from '@angular/core';

import {Talk} from 'conference/Talk';
import {Track} from 'conference/Track';
import {Person} from 'conference/Person';
import {Conference} from 'conference/Conference';
import {ConferenceFactoryImpl} from 'conference/ConferenceFactoryImpl';

import * as Papa from 'papaparse';

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

    this.user = ConferenceFactoryImpl.eINSTANCE.createPerson();

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


            closure.conference.talks.add(talk);

          }

          closure.filteredTalks = conference.talks;
        }
      }


    });

  }

  ngOnInit() {
  }

}
