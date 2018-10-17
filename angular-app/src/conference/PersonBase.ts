import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {ConferencePackageLiterals} from "conference/ConferencePackageLiterals";
import {ENotificationImpl} from "ecore/ENotificationImpl";
import {NotificationImpl} from "ecore/NotificationImpl";
import {Talk} from "conference/Talk";
import {BasicEObjectImpl} from "ecore/BasicEObjectImpl";
import {EClass} from "ecore/EClass";
import {NotificationChain} from "ecore/NotificationChain";
import {DiagnosticChain} from "ecore/DiagnosticChain";
import {Person} from "conference/Person";
import {Organization} from "conference/Organization";
import {TalkImpl} from 'conference/TalkImpl';
import {Set} from 'ecore/Set';
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
	
	

	
	public meetsPersonAt(other:Person): Set<Talk> {
		return TalkImpl.allInstances()
      .select(t =>
        (t.speakers.includes(this) ||
          t.attendees.includes(this))
        &&
        (t.speakers.includes(this) ||
          t.attendees.includes(this)
        )
      );
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
	

	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
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
	//public eGetFromPerson = this.eGet;
	
	//TODO context is map<object, object>
	public noConflict(diagnostics:DiagnosticChain, context:any):boolean
	{
		return this.attends
      .forAll(t1 => this.attends
        .forAll(
          t2 => (t1.timeBegin < t2.timeBegin &&
            t1.timeEnd <= t2.timeBegin)
            ||
            (t2.timeBegin < t1.timeBegin &&
              t2.timeEnd <= t1.timeBegin)
        )
      );
	}
}
