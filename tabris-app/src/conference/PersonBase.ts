//import ENotificationImpl = Ecore.ENotificationImpl;
//import EClass = Ecore.EClass;
export class PersonBase
extends BasicEObjectImpl
implements Person

{
	private _lastName:string = "";
	get lastName():string{
		return this._lastName;
	}
	set lastName(value:string){
		this._lastName = value; 
	}
	private _firstName:string = "";
	get firstName():string{
		return this._firstName;
	}
	set firstName(value:string){
		this._firstName = value; 
	}
	private _affiliation:Organization = null;
	get affiliation():Organization{
	
		return this._affiliation;
	}
	set affiliation(value:Organization) {
		let oldvalue = this._affiliation;
		this._affiliation = value;
		if (this.eNotificationRequired()){
			this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,ConferencePackageLiterals.PERSON_AFFILIATION , oldvalue, value));
		}
	}


	protected eStaticClass():EClass{
		//return ConferencePackageLiterals.PERSON;
		return null;
	}


	public basicSetAffiliation(newobj:Organization, msgs:NotificationChain):NotificationChain {
		let oldobj = this._affiliation;
		this._affiliation = newobj;
		if (this.eNotificationRequired()) {
			let notification = new ENotificationImpl(this, NotificationImpl.SET, ConferencePackageLiterals.PERSON_AFFILIATION, oldobj, newobj);
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
			case ConferencePackageLiterals.PERSON_AFFILIATION:
				return this.affiliation;
			case ConferencePackageLiterals.PERSON_FIRSTNAME:
				return this.firstName;
			case ConferencePackageLiterals.PERSON_LASTNAME:
				return this.lastName;
		}
		//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromPerson = this.eGet;
}

import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {ConferencePackageLiterals} from "conference/ConferencePackageLiterals";
import {ENotificationImpl} from "ecore/ENotificationImpl";
import {NotificationImpl} from "ecore/NotificationImpl";
import {BasicEObjectImpl} from "ecore/BasicEObjectImpl";
import {EClass} from "ecore/EClass";
import {NotificationChain} from "ecore/NotificationChain";
import {Person} from "conference/Person";
import {Organization} from "conference/Organization";
