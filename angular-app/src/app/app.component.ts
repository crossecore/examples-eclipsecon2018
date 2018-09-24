import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Papa from 'papaparse';

import PouchDB from 'pouchdb';
import {tap} from 'rxjs/operators';


class Talk {
  title: string;
  speakers: Array<Person> = Array<Person>();
  startDate: Date;
  endDate: Date;
}

class Person {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  talks: Array<Talk>;

  constructor(private http: HttpClient) {
    this.talks = new Array<Talk>();

    var importedTalks = new Array<Talk>();
    var closure = this;

    Papa.parse('assets/eclipsecon.csv', {
      download: true,
      complete: function(results) {
        console.log(results);

        for(var row of results.data){
          //"Title","Track","Speaker(s)","Organization","Room","Time"
          var rawTitle = row[0];
          var rawTrack = row[1];
          var rawSpeakers = row[2];
          var rawOrganization = row[3];
          var rawRoom = row[4];
          var rawTime = row[5];

          var talk = new Talk();
          talk.title = rawTitle;

          var speaker = new Person();

          if(rawSpeakers!==undefined){
            var index = rawSpeakers.indexOf('(');

            if(index > -1){
              var name = rawSpeakers.substring(0, index - 1);
              var parts = name.split(' ');
              speaker.firstName = parts[0];
              speaker.lastName = parts[1];
              talk.speakers.push(speaker);
            }
          }

          let match = rawTime.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|Sepetember|October|November|December) (\d{1,2}), (\d{4}) - (\d{2}):(\d{2}) to (\d{2}):(\d{2})/);

          if(match !== null){
            let dayofweek = match[1];
            let month = ["January", "February", "March", "April", "May", "June", "July", "August", "Sepetember", "October", "November", "December"].indexOf(match[2]);
            let day = +match[3];
            let year = +match[4];
            let hour = +match[5];
            let minute = +match[6];
            // "Tuesday, October 23, 2018 - 14:30 to 15:05"
            talk.startDate = new Date(year, month, day, hour, minute);
          }


          closure.talks.push(talk);
        }
      }
    });


  }

  ngOnInit() {


    const db = new PouchDB('helloworld');
    // okay, now we have our database

    db.put({
      _id: 'mydoc',
      title: 'Heroes'
    }).then(function (response) {

      console.log(response);

    }).catch(function (err) {

      console.log(err);
    });
  }


}
