import {Conference} from "../conference/Conference";
import {Room} from "../conference/Room";
import {ConferencePackage} from "../conference/ConferencePackage";
import {Switch} from "../ecore/Switch";
import {ConferencePackageImpl} from "../conference/ConferencePackageImpl";
import {EPackage} from "../ecore/EPackage";
import {Person} from "../conference/Person";
import {NamedElement} from "../conference/NamedElement";
import {EObject} from "../ecore/EObject";
import {Track} from "../conference/Track";
import {Talk} from "../conference/Talk";
import {Venue} from "../conference/Venue";
import {Organization} from "../conference/Organization";
export class ConferenceSwitch<T> extends Switch<T> {
	protected static modelPackage:ConferencePackage;
	
	constructor(){
		super();
		if (ConferenceSwitch.modelPackage == null) {
			ConferenceSwitch.modelPackage = ConferencePackageImpl.eINSTANCE;
		}	
	}
	
	public isSwitchFor(ePackage:EPackage):boolean{
		return ePackage === ConferenceSwitch.modelPackage;
	}
	
	public doSwitch(classifierID:number, theEObject:EObject):T {
		switch (classifierID) {
			case ConferencePackageImpl.ROOM: {
				let obj:Room = <Room>theEObject;
				let result:T = this.caseRoom(obj);
				if (result == null) result = this.caseNamedElement(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case ConferencePackageImpl.PERSON: {
				let obj:Person = <Person>theEObject;
				let result:T = this.casePerson(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case ConferencePackageImpl.ORGANIZATION: {
				let obj:Organization = <Organization>theEObject;
				let result:T = this.caseOrganization(obj);
				if (result == null) result = this.caseNamedElement(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case ConferencePackageImpl.TRACK: {
				let obj:Track = <Track>theEObject;
				let result:T = this.caseTrack(obj);
				if (result == null) result = this.caseNamedElement(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case ConferencePackageImpl.TALK: {
				let obj:Talk = <Talk>theEObject;
				let result:T = this.caseTalk(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case ConferencePackageImpl.CONFERENCE: {
				let obj:Conference = <Conference>theEObject;
				let result:T = this.caseConference(obj);
				if (result == null) result = this.caseNamedElement(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case ConferencePackageImpl.VENUE: {
				let obj:Venue = <Venue>theEObject;
				let result:T = this.caseVenue(obj);
				if (result == null) result = this.caseNamedElement(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			case ConferencePackageImpl.NAMEDELEMENT: {
				let obj:NamedElement = <NamedElement>theEObject;
				let result:T = this.caseNamedElement(obj);
				if (result == null) result = this.defaultCase(theEObject);
				return result;
			}
			default: return this.defaultCase(theEObject);
		}
	}
	
	
	public caseRoom(object:Room):T {
		return null;
	}
	public casePerson(object:Person):T {
		return null;
	}
	public caseOrganization(object:Organization):T {
		return null;
	}
	public caseTrack(object:Track):T {
		return null;
	}
	public caseTalk(object:Talk):T {
		return null;
	}
	public caseConference(object:Conference):T {
		return null;
	}
	public caseVenue(object:Venue):T {
		return null;
	}
	public caseNamedElement(object:NamedElement):T {
		return null;
	}
	
}

