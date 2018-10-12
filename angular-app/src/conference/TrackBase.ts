import {InternalEObject} from "ecore/InternalEObject";
import {Conference} from "conference/Conference";
import {OrderedSet} from "ecore/OrderedSet";
import {ConferencePackageLiterals} from "conference/ConferencePackageLiterals";
import {ENotificationImpl} from "ecore/ENotificationImpl";
import {NotificationImpl} from "ecore/NotificationImpl";
import {Track} from "conference/Track";
import {Talk} from "conference/Talk";
import {BasicEObjectImpl} from "ecore/BasicEObjectImpl";
import {EClass} from "ecore/EClass";
import {NotificationChain} from "ecore/NotificationChain";
//import ENotificationImpl = Ecore.ENotificationImpl;
//import EClass = Ecore.EClass;
export class TrackBase
extends BasicEObjectImpl
implements Track
{
	private _name:string = "";
	get name():string{
		return this._name;
	}
	set name(value:string){
		this._name = value; 
	}
	get conference():Conference{
	
		if (this.eContainerFeatureID() != ConferencePackageLiterals.TRACK_CONFERENCE) return null;
		return this.eInternalContainer() as Conference;
	}
	set conference(value:Conference) {
		if (value != this.eInternalContainer() as Conference) {
			let msgs:NotificationChain = null;
			if (this.eInternalContainer() as Conference != null){
				msgs = (this.eInternalContainer() as Conference).eInverseRemove(this, ConferencePackageLiterals.CONFERENCE_TRACKS, /*Track*/ null , msgs);
			}
			if (value != null){
				msgs = value.eInverseAdd(this, ConferencePackageLiterals.CONFERENCE_TRACKS, /*Track*/ null, msgs);
			}
			msgs = this.basicSetConference(value, msgs);
			if (msgs != null) {
				msgs.dispatch();
			}
		}
		else if (this.eNotificationRequired()){
			this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,ConferencePackageLiterals.TRACK_CONFERENCE , value, value));
		}
	}
	get talks():OrderedSet<Talk>{
		/*OCL: self.conference.talks->select(t:Talk|t.track = self)*/
		return this.conference.talks.select(t => t.track == this);
		
	}
	
	


	/* do not override from BasicEObject!
	protected eStaticClass():EClass{
		//return ConferencePackageLiterals.TRACK;
		return null;
	}
	*/

	public eInverseAdd(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain): NotificationChain{
		switch (featureID) {
			case ConferencePackageLiterals.TRACK_CONFERENCE:
				if (this.eInternalContainer() != null) {
					msgs = this.eBasicRemoveFromContainer(msgs);
				}
				return this.basicSetConference(otherEnd as Conference, msgs);
		}
		//return this.eInverseAddFromNamedElement(otherEnd, featureID, msgs);
		return super.eInverseAdd(otherEnd, featureID, msgs);
	}
	//public eInverseAddFromTrack = this.eInverseAdd;
	
	public eInverseRemove(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain):NotificationChain{
		switch (featureID) {
			case ConferencePackageLiterals.TRACK_CONFERENCE:
				return this.basicSetConference(null, msgs);
		}
		//return this.eInverseRemoveFromNamedElement(otherEnd, featureID, msgs);
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}
	
	//public eInverseRemoveFromTrack = this.eInverseRemove;

	public basicSetConference(newobj:Conference, msgs:NotificationChain):NotificationChain {
			msgs = this.eBasicSetContainer(newobj, ConferencePackageLiterals.TRACK_CONFERENCE, msgs);
			return msgs;
	}
	

	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
		switch (featureID) {
			case ConferencePackageLiterals.TRACK_NAME:
				return this.name;
			case ConferencePackageLiterals.TRACK_TALKS:
				return this.talks;
			case ConferencePackageLiterals.TRACK_CONFERENCE:
				return this.conference;
		}
		//return this.eGetFromNamedElement(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromTrack = this.eGet;
	
}

