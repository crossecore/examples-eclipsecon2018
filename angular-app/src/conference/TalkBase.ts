import {ConferencePackageLiterals} from "conference/ConferencePackageLiterals";
import {AbstractCollection} from "ecore/AbstractCollection";
import {ENotificationImpl} from "ecore/ENotificationImpl";
import {Room} from "conference/Room";
import {BasicEObjectImpl} from "ecore/BasicEObjectImpl";
import {EClass} from "ecore/EClass";
import {Person} from "conference/Person";
import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {EObject} from "ecore/EObject";
import {NotificationImpl} from "ecore/NotificationImpl";
import {Talk} from "conference/Talk";
import {Track} from "conference/Track";
import {NotificationChain} from "ecore/NotificationChain";
import {DiagnosticChain} from "ecore/DiagnosticChain";
//import ENotificationImpl = Ecore.ENotificationImpl;
//import EClass = Ecore.EClass;
		
			export class TalkBase
			extends BasicEObjectImpl
			implements Talk
			{
				private _title:string = "";
				get title():string{
					return this._title;
				}
				set title(value:string){
					this._title = value; 
				}
				private _timeBegin:Date = null;
				get timeBegin():Date{
					return this._timeBegin;
				}
				set timeBegin(value:Date){
					this._timeBegin = value; 
				}
				private _timeEnd:Date = null;
				get timeEnd():Date{
					return this._timeEnd;
				}
				set timeEnd(value:Date){
					this._timeEnd = value; 
				}
				private _track:Track = null;
				get track():Track{
				
					return this._track;
				}
				set track(value:Track) {
					let oldvalue = this._track;
					this._track = value;
					if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,ConferencePackageLiterals.TALK_TRACK , oldvalue, value));
					}
				}
				private _room:Room = null;
				get room():Room{
				
					return this._room;
				}
				set room(value:Room) {
					let oldvalue = this._room;
					this._room = value;
					if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,ConferencePackageLiterals.TALK_ROOM , oldvalue, value));
					}
				}
				private _speakers:OrderedSet<Person> = null;
				get speakers():OrderedSet<Person>{
					if(this._speakers===null){
						this._speakers = new OrderedSet<Person>(this, ConferencePackageLiterals.TALK_SPEAKERS, ConferencePackageLiterals.PERSON_GIVES);
							
					}
					return this._speakers;
					
				}
				
				
				private _attendees:OrderedSet<Person> = null;
				get attendees():OrderedSet<Person>{
					if(this._attendees===null){
						this._attendees = new OrderedSet<Person>(this, ConferencePackageLiterals.TALK_ATTENDEES, ConferencePackageLiterals.PERSON_ATTENDS);
							
					}
					return this._attendees;
					
				}
				
				

			
				/* do not override from BasicEObject!
				protected eStaticClass():EClass{
					//return ConferencePackageLiterals.TALK;
					return null;
				}
				*/
			
				public eInverseAdd(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain): NotificationChain{
					switch (featureID) {
						case ConferencePackageLiterals.TALK_ATTENDEES:
							return this.attendees.basicAdd(otherEnd as Person, msgs);
						case ConferencePackageLiterals.TALK_SPEAKERS:
							return this.speakers.basicAdd(otherEnd as Person, msgs);
					}
					//return this.eInverseAddFromBasicEObjectImpl(otherEnd, featureID, msgs);
					return super.eInverseAdd(otherEnd, featureID, msgs);
				}
				//public eInverseAddFromTalk = this.eInverseAdd;
				
				public eInverseRemove(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain):NotificationChain{
					switch (featureID) {
						case ConferencePackageLiterals.TALK_ATTENDEES:
							return this.attendees.basicRemove(otherEnd as Person, msgs);
						case ConferencePackageLiterals.TALK_SPEAKERS:
							return this.speakers.basicRemove(otherEnd as Person, msgs);
					}
					//return this.eInverseRemoveFromBasicEObjectImpl(otherEnd, featureID, msgs);
					return super.eInverseRemove(otherEnd, featureID, msgs);
				}
				
				//public eInverseRemoveFromTalk = this.eInverseRemove;
			
				public basicSetTrack(newobj:Track, msgs:NotificationChain):NotificationChain {
					let oldobj = this._track;
					this._track = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, ConferencePackageLiterals.TALK_TRACK, oldobj, newobj);
						if (msgs == null){
							msgs = notification;
						}
						else{
							msgs.add(notification);
						}
					}
					return msgs;
				}
				public basicSetRoom(newobj:Room, msgs:NotificationChain):NotificationChain {
					let oldobj = this._room;
					this._room = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, ConferencePackageLiterals.TALK_ROOM, oldobj, newobj);
						if (msgs == null){
							msgs = notification;
						}
						else{
							msgs.add(notification);
						}
					}
					return msgs;
				}
				
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case ConferencePackageLiterals.TALK_TITLE:
							return this.title;
						case ConferencePackageLiterals.TALK_TIMEBEGIN:
							return this.timeBegin;
						case ConferencePackageLiterals.TALK_TIMEEND:
							return this.timeEnd;
						case ConferencePackageLiterals.TALK_TRACK:
							return this.track;
						case ConferencePackageLiterals.TALK_ROOM:
							return this.room;
						case ConferencePackageLiterals.TALK_SPEAKERS:
							return this.speakers;
						case ConferencePackageLiterals.TALK_ATTENDEES:
							return this.attendees;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case ConferencePackageLiterals.TALK_TITLE:
							this.title = <string> newValue;
							return;
						case ConferencePackageLiterals.TALK_TIMEBEGIN:
							this.timeBegin = <Date> newValue;
							return;
						case ConferencePackageLiterals.TALK_TIMEEND:
							this.timeEnd = <Date> newValue;
							return;
						case ConferencePackageLiterals.TALK_TRACK:
							this.track = <Track> newValue;
							return;
						case ConferencePackageLiterals.TALK_ROOM:
							this.room = <Room> newValue;
							return;
						case ConferencePackageLiterals.TALK_SPEAKERS:
							this.speakers.clear();
							this.speakers.concat((newValue as AbstractCollection<EObject>).map(i => i as Person));
							return;
						case ConferencePackageLiterals.TALK_ATTENDEES:
							this.attendees.clear();
							this.attendees.concat((newValue as AbstractCollection<EObject>).map(i => i as Person));
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
				//TODO context is map<object, object>
				public beginBeforeEnd(diagnostics:DiagnosticChain, context:any):boolean
				{
					/*
					self.timeBegin < self.timeEnd;
					*/
					return true;
				}
				//TODO context is map<object, object>
				public hasDuration(diagnostics:DiagnosticChain, context:any):boolean
				{
					/*
					self.timeBegin <> self.timeEnd;
					*/
					return true;
				}
			}
			
