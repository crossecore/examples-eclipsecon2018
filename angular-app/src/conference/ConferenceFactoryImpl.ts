import {Conference} from "conference/Conference";
import {TrackImpl} from "conference/TrackImpl";
import {Room} from "conference/Room";
import {ConferencePackageImpl} from "conference/ConferencePackageImpl";
import {EClass} from "ecore/EClass";
import {Person} from "conference/Person";
import {OrganizationImpl} from "conference/OrganizationImpl";
import {EObject} from "ecore/EObject";
import {Track} from "conference/Track";
import {Talk} from "conference/Talk";
import {EFactoryImpl} from "ecore/EFactoryImpl";
import {PersonImpl} from "conference/PersonImpl";
import {TalkImpl} from "conference/TalkImpl";
import {RoomImpl} from "conference/RoomImpl";
import {Venue} from "conference/Venue";
import {VenueImpl} from "conference/VenueImpl";
import {ConferenceImpl} from "conference/ConferenceImpl";
import {ConferenceFactory} from "conference/ConferenceFactory";
import {Organization} from "conference/Organization";
export class ConferenceFactoryImpl extends EFactoryImpl implements ConferenceFactory{
	public static eINSTANCE : ConferenceFactory = ConferenceFactoryImpl.init();
	public static init() : ConferenceFactory 
	{
		return new ConferenceFactoryImpl();
	}
	
	public createRoom = () : Room => {
		var theRoom = new RoomImpl();
		
		//TODO optimize memory consumption:
		theRoom._eStaticClass = ConferencePackageImpl.eINSTANCE.getRoom();
		
		RoomImpl.allInstances_.add(theRoom);
		
		return theRoom;
	}
	public createPerson = () : Person => {
		var thePerson = new PersonImpl();
		
		//TODO optimize memory consumption:
		thePerson._eStaticClass = ConferencePackageImpl.eINSTANCE.getPerson();
		
		PersonImpl.allInstances_.add(thePerson);
		
		return thePerson;
	}
	public createOrganization = () : Organization => {
		var theOrganization = new OrganizationImpl();
		
		//TODO optimize memory consumption:
		theOrganization._eStaticClass = ConferencePackageImpl.eINSTANCE.getOrganization();
		
		OrganizationImpl.allInstances_.add(theOrganization);
		
		return theOrganization;
	}
	public createTrack = () : Track => {
		var theTrack = new TrackImpl();
		
		//TODO optimize memory consumption:
		theTrack._eStaticClass = ConferencePackageImpl.eINSTANCE.getTrack();
		
		TrackImpl.allInstances_.add(theTrack);
		
		return theTrack;
	}
	public createTalk = () : Talk => {
		var theTalk = new TalkImpl();
		
		//TODO optimize memory consumption:
		theTalk._eStaticClass = ConferencePackageImpl.eINSTANCE.getTalk();
		
		TalkImpl.allInstances_.add(theTalk);
		
		return theTalk;
	}
	public createConference = () : Conference => {
		var theConference = new ConferenceImpl();
		
		//TODO optimize memory consumption:
		theConference._eStaticClass = ConferencePackageImpl.eINSTANCE.getConference();
		
		ConferenceImpl.allInstances_.add(theConference);
		
		return theConference;
	}
	public createVenue = () : Venue => {
		var theVenue = new VenueImpl();
		
		//TODO optimize memory consumption:
		theVenue._eStaticClass = ConferencePackageImpl.eINSTANCE.getVenue();
		
		VenueImpl.allInstances_.add(theVenue);
		
		return theVenue;
	}
	
	public create(eClass:EClass):EObject {
		switch (eClass.getClassifierID()) {
			case ConferencePackageImpl.ROOM: return this.createRoom();
			case ConferencePackageImpl.PERSON: return this.createPerson();
			case ConferencePackageImpl.ORGANIZATION: return this.createOrganization();
			case ConferencePackageImpl.TRACK: return this.createTrack();
			case ConferencePackageImpl.TALK: return this.createTalk();
			case ConferencePackageImpl.CONFERENCE: return this.createConference();
			case ConferencePackageImpl.VENUE: return this.createVenue();
			default:
				throw new Error("The class '" + eClass.name + "' is not a valid classifier");
		}
	}
}
