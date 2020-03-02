import { Component, OnInit } from '@angular/core';
import {Person} from 'conference/Person';
import {ConferenceFactoryImpl} from 'conference/ConferenceFactoryImpl';
import {OrderedSet} from 'ecore/OrderedSet';
import {EAttribute} from 'ecore/EAttribute';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Person;
  attributes:OrderedSet<EAttribute>;

  constructor() {

    this.user = ConferenceFactoryImpl.eINSTANCE.createPerson();

    this.attributes = this.user.eClass().eAllAttributes;
  }

  ngOnInit() {
  }

}
