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
	private _timeEnd:Date = null;
	get timeEnd():Date{
		return this._timeEnd;
	}
	set timeEnd(value:Date){
		this._timeEnd = value; 
	}
	private _timeBegin:Date = null;
	get timeBegin():Date{
		return this._timeBegin;
	}
	set timeBegin(value:Date){
		this._timeBegin = value; 
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
			this._speakers = new OrderedSet<Person>(this, ConferencePackageLiterals.TALK_SPEAKERS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - ConferencePackageLiterals.TALK_SPEAKERS);
				
		}
		return this._speakers;
		
	}
	
	
	private _attendees:OrderedSet<Person> = null;
	get attendees():OrderedSet<Person>{
		if(this._attendees===null){
			this._attendees = new OrderedSet<Person>(this, ConferencePackageLiterals.TALK_ATTENDEES, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - ConferencePackageLiterals.TALK_ATTENDEES);
				
		}
		return this._attendees;
		
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


	protected eStaticClass():EClass{
		//return ConferencePackageLiterals.TALK;
		return null;
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
	

	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
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
	//public eGetFromTalk = this.eGet;
}

import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {ConferencePackageLiterals} from "conference/ConferencePackageLiterals";
import {ENotificationImpl} from "ecore/ENotificationImpl";
import {NotificationImpl} from "ecore/NotificationImpl";
import {Talk} from "conference/Talk";
import {Room} from "conference/Room";
import {Track} from "conference/Track";
import {BasicEObjectImpl} from "ecore/BasicEObjectImpl";
import {EClass} from "ecore/EClass";
import {NotificationChain} from "ecore/NotificationChain";
import {Person} from "conference/Person";
