import {Conference} from "../conference/Conference";
import {ConferencePackageLiterals} from "../conference/ConferencePackageLiterals";
import {AbstractCollection} from "../ecore/AbstractCollection";
import {ENotificationImpl} from "../ecore/ENotificationImpl";
import {BasicEObjectImpl} from "../ecore/BasicEObjectImpl";
import {EClass} from "../ecore/EClass";
import {Person} from "../conference/Person";
import {InternalEObject} from "../ecore/InternalEObject";
import {OrderedSet} from "../ecore/OrderedSet";
import {EObject} from "../ecore/EObject";
import {NotificationImpl} from "../ecore/NotificationImpl";
import {Talk} from "../conference/Talk";
import {Track} from "../conference/Track";
import {Venue} from "../conference/Venue";
import {NotificationChain} from "../ecore/NotificationChain";
import {Organization} from "../conference/Organization";
//import ENotificationImpl = Ecore.ENotificationImpl;
//import EClass = Ecore.EClass;
		
			export class ConferenceBase
			extends BasicEObjectImpl
			implements Conference
			{
				private _name:string = "";
				get name():string{
					return this._name;
				}
				set name(value:string){
					this._name = value; 
				}
				private _venue:Venue = null;
				get venue():Venue{
				
					return this._venue;
				}
				set venue(value:Venue) {
					if (value != this._venue) {
						let msgs:NotificationChain = null;
						if (this._venue != null){
							msgs = (this._venue).eInverseRemove(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - ConferencePackageLiterals.CONFERENCE_VENUE, /*null*/ null , msgs);
						}
						if (value != null){
							msgs = value.eInverseAdd(this, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - ConferencePackageLiterals.CONFERENCE_VENUE, /*null*/ null, msgs);
						}
						msgs = this.basicSetVenue(value, msgs);
						if (msgs != null) {
							msgs.dispatch();
						}
					}
					else if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,ConferencePackageLiterals.CONFERENCE_VENUE , value, value));
					}
				}
				private _talks:OrderedSet<Talk> = null;
				get talks():OrderedSet<Talk>{
					if(this._talks===null){
						this._talks = new OrderedSet<Talk>(this, ConferencePackageLiterals.CONFERENCE_TALKS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - ConferencePackageLiterals.CONFERENCE_TALKS);
							
					}
					return this._talks;
					
				}
				
				
				private _attendees:OrderedSet<Person> = null;
				get attendees():OrderedSet<Person>{
					if(this._attendees===null){
						this._attendees = new OrderedSet<Person>(this, ConferencePackageLiterals.CONFERENCE_ATTENDEES, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - ConferencePackageLiterals.CONFERENCE_ATTENDEES);
							
					}
					return this._attendees;
					
				}
				
				
				private _tracks:OrderedSet<Track> = null;
				get tracks():OrderedSet<Track>{
					if(this._tracks===null){
						this._tracks = new OrderedSet<Track>(this, ConferencePackageLiterals.CONFERENCE_TRACKS, ConferencePackageLiterals.TRACK_CONFERENCE);
							
					}
					return this._tracks;
					
				}
				
				
				private _organizations:OrderedSet<Organization> = null;
				get organizations():OrderedSet<Organization>{
					if(this._organizations===null){
						this._organizations = new OrderedSet<Organization>(this, ConferencePackageLiterals.CONFERENCE_ORGANIZATIONS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - ConferencePackageLiterals.CONFERENCE_ORGANIZATIONS);
							
					}
					return this._organizations;
					
				}
				
				

			
				/* do not override from BasicEObject!
				protected eStaticClass():EClass{
					//return ConferencePackageLiterals.CONFERENCE;
					return null;
				}
				*/
			
				public eInverseAdd(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain): NotificationChain{
					switch (featureID) {
						case ConferencePackageLiterals.CONFERENCE_TRACKS:
							return this.tracks.basicAdd(otherEnd as Track, msgs);
					}
					//return this.eInverseAddFromNamedElement(otherEnd, featureID, msgs);
					return super.eInverseAdd(otherEnd, featureID, msgs);
				}
				//public eInverseAddFromConference = this.eInverseAdd;
				
				public eInverseRemove(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain):NotificationChain{
					switch (featureID) {
						case ConferencePackageLiterals.CONFERENCE_TRACKS:
							return this.tracks.basicRemove(otherEnd as Track, msgs);
					}
					//return this.eInverseRemoveFromNamedElement(otherEnd, featureID, msgs);
					return super.eInverseRemove(otherEnd, featureID, msgs);
				}
				
				//public eInverseRemoveFromConference = this.eInverseRemove;
			
				public basicSetVenue(newobj:Venue, msgs:NotificationChain):NotificationChain {
					let oldobj = this._venue;
					this._venue = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, ConferencePackageLiterals.CONFERENCE_VENUE, oldobj, newobj);
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
						case ConferencePackageLiterals.CONFERENCE_NAME:
							return this.name;
						case ConferencePackageLiterals.CONFERENCE_VENUE:
							return this.venue;
						case ConferencePackageLiterals.CONFERENCE_TALKS:
							return this.talks;
						case ConferencePackageLiterals.CONFERENCE_ATTENDEES:
							return this.attendees;
						case ConferencePackageLiterals.CONFERENCE_TRACKS:
							return this.tracks;
						case ConferencePackageLiterals.CONFERENCE_ORGANIZATIONS:
							return this.organizations;
					}
					//return this.eGetFromNamedElement(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case ConferencePackageLiterals.CONFERENCE_NAME:
							this.name = <string> newValue;
							return;
						case ConferencePackageLiterals.CONFERENCE_VENUE:
							this.venue = <Venue> newValue;
							return;
						case ConferencePackageLiterals.CONFERENCE_TALKS:
							this.talks.clear();
							this.talks.concat((newValue as AbstractCollection<EObject>).map(i => i as Talk));
							return;
						case ConferencePackageLiterals.CONFERENCE_ATTENDEES:
							this.attendees.clear();
							this.attendees.concat((newValue as AbstractCollection<EObject>).map(i => i as Person));
							return;
						case ConferencePackageLiterals.CONFERENCE_TRACKS:
							this.tracks.clear();
							this.tracks.concat((newValue as AbstractCollection<EObject>).map(i => i as Track));
							return;
						case ConferencePackageLiterals.CONFERENCE_ORGANIZATIONS:
							this.organizations.clear();
							this.organizations.concat((newValue as AbstractCollection<EObject>).map(i => i as Organization));
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			
