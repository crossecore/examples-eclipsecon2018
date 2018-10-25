import {EAttribute} from "../ecore/EAttribute";
import {EReference} from "../ecore/EReference";
import {EClass} from "../ecore/EClass";
import {EPackage} from "../ecore/EPackage";
export interface ConferencePackage extends EPackage {
	getNamedElement():EClass;
	
	getNamedElement_Name():EAttribute;
	getRoom():EClass;
	
	getPerson():EClass;
	getPerson_WorksFor():EReference;
	getPerson_Gives():EReference;
	getPerson_Attends():EReference;
	
	getPerson_FirstName():EAttribute;
	getPerson_LastName():EAttribute;
	getOrganization():EClass;
	
	getTrack():EClass;
	getTrack_Talks():EReference;
	getTrack_Conference():EReference;
	
	getTalk():EClass;
	getTalk_Track():EReference;
	getTalk_Room():EReference;
	getTalk_Speakers():EReference;
	getTalk_Attendees():EReference;
	
	getTalk_Title():EAttribute;
	getTalk_TimeBegin():EAttribute;
	getTalk_TimeEnd():EAttribute;
	getConference():EClass;
	getConference_Venue():EReference;
	getConference_Talks():EReference;
	getConference_Attendees():EReference;
	getConference_Tracks():EReference;
	getConference_Organizations():EReference;
	
	getVenue():EClass;
	getVenue_Rooms():EReference;
	
}
