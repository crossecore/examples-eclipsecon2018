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
import {NotificationChain} from "../ecore/NotificationChain";
import {DiagnosticChain} from "../ecore/DiagnosticChain";
import {Organization} from "../conference/Organization";
//import ENotificationImpl = Ecore.ENotificationImpl;
//import EClass = Ecore.EClass;
		
			export class PersonBase
			extends BasicEObjectImpl
			implements Person
			{
				private _firstName:string = "";
				get firstName():string{
					return this._firstName;
				}
				set firstName(value:string){
					this._firstName = value; 
				}
				private _lastName:string = "";
				get lastName():string{
					return this._lastName;
				}
				set lastName(value:string){
					this._lastName = value; 
				}
				private _worksFor:Organization = null;
				get worksFor():Organization{
				
					return this._worksFor;
				}
				set worksFor(value:Organization) {
					let oldvalue = this._worksFor;
					this._worksFor = value;
					if (this.eNotificationRequired()){
						this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,ConferencePackageLiterals.PERSON_WORKSFOR , oldvalue, value));
					}
				}
				private _gives:OrderedSet<Talk> = null;
				get gives():OrderedSet<Talk>{
					if(this._gives===null){
						this._gives = new OrderedSet<Talk>(this, ConferencePackageLiterals.PERSON_GIVES, ConferencePackageLiterals.TALK_SPEAKERS);
							
					}
					return this._gives;
					
				}
				
				
				private _attends:OrderedSet<Talk> = null;
				get attends():OrderedSet<Talk>{
					if(this._attends===null){
						this._attends = new OrderedSet<Talk>(this, ConferencePackageLiterals.PERSON_ATTENDS, ConferencePackageLiterals.TALK_ATTENDEES);
							
					}
					return this._attends;
					
				}
				
				

				
				public meetsPersonAt(other:Person): Talk {
					return null;

				  //return Talk.allInstances()->select(t:Talk | (t.speakers->includes(self) or t.attendees->includes(self)) and (t.speakers->includes(other) or t.attendees->includes(other)));
				};
			
				/* do not override from BasicEObject!
				protected eStaticClass():EClass{
					//return ConferencePackageLiterals.PERSON;
					return null;
				}
				*/
			
				public eInverseAdd(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain): NotificationChain{
					switch (featureID) {
						case ConferencePackageLiterals.PERSON_GIVES:
							return this.gives.basicAdd(otherEnd as Talk, msgs);
						case ConferencePackageLiterals.PERSON_ATTENDS:
							return this.attends.basicAdd(otherEnd as Talk, msgs);
					}
					//return this.eInverseAddFromBasicEObjectImpl(otherEnd, featureID, msgs);
					return super.eInverseAdd(otherEnd, featureID, msgs);
				}
				//public eInverseAddFromPerson = this.eInverseAdd;
				
				public eInverseRemove(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain):NotificationChain{
					switch (featureID) {
						case ConferencePackageLiterals.PERSON_GIVES:
							return this.gives.basicRemove(otherEnd as Talk, msgs);
						case ConferencePackageLiterals.PERSON_ATTENDS:
							return this.attends.basicRemove(otherEnd as Talk, msgs);
					}
					//return this.eInverseRemoveFromBasicEObjectImpl(otherEnd, featureID, msgs);
					return super.eInverseRemove(otherEnd, featureID, msgs);
				}
				
				//public eInverseRemoveFromPerson = this.eInverseRemove;
			
				public basicSetWorksFor(newobj:Organization, msgs:NotificationChain):NotificationChain {
					let oldobj = this._worksFor;
					this._worksFor = newobj;
					if (this.eNotificationRequired()) {
						let notification = new ENotificationImpl(this, NotificationImpl.SET, ConferencePackageLiterals.PERSON_WORKSFOR, oldobj, newobj);
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
						case ConferencePackageLiterals.PERSON_WORKSFOR:
							return this.worksFor;
						case ConferencePackageLiterals.PERSON_FIRSTNAME:
							return this.firstName;
						case ConferencePackageLiterals.PERSON_LASTNAME:
							return this.lastName;
						case ConferencePackageLiterals.PERSON_GIVES:
							return this.gives;
						case ConferencePackageLiterals.PERSON_ATTENDS:
							return this.attends;
					}
					//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case ConferencePackageLiterals.PERSON_FIRSTNAME:
							this.firstName = <string> newValue;
							return;
						case ConferencePackageLiterals.PERSON_LASTNAME:
							this.lastName = <string> newValue;
							return;
						case ConferencePackageLiterals.PERSON_WORKSFOR:
							this.worksFor = <Organization> newValue;
							return;
						case ConferencePackageLiterals.PERSON_GIVES:
							this.gives.clear();
							this.gives.concat((newValue as AbstractCollection<EObject>).map(i => i as Talk));
							return;
						case ConferencePackageLiterals.PERSON_ATTENDS:
							this.attends.clear();
							this.attends.concat((newValue as AbstractCollection<EObject>).map(i => i as Talk));
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
				//TODO context is map<object, object>
				public noConflict(diagnostics:DiagnosticChain, context:any):boolean
				{
					/*
					self.attends->forAll(t1:Talk | self.attends->forAll(t2:Talk| (t1.timeBegin < t2.timeBegin and t1.timeEnd <= t2.timeBegin) or (t2.timeBegin < t1.timeBegin and t2.timeEnd <= t1.timeBegin)));
					*/
					return true;
				}
			}
			
