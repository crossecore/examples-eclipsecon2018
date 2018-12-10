import {Component, OnInit} from '@angular/core';


import {ConferenceFactoryImpl} from 'conference/ConferenceFactoryImpl';

import {Talk} from 'conference/Talk';
import {Track} from 'conference/Track';
import {Person} from 'conference/Person';
import {Conference} from 'conference/Conference';
import {EClass} from 'ecore/EClass';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  ngOnInit() {

  }


}
