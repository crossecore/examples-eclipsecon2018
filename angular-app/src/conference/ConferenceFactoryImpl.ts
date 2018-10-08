import {Conference} from "conference/Conference";
import {TrackImpl} from "conference/TrackImpl";
import {Room} from "conference/Room";
import {Person} from "conference/Person";
import {OrganizationImpl} from "conference/OrganizationImpl";
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
		return theRoom;
	}
	public createPerson = () : Person => {
		var thePerson = new PersonImpl();
		return thePerson;
	}
	public createOrganization = () : Organization => {
		var theOrganization = new OrganizationImpl();
		return theOrganization;
	}
	public createTrack = () : Track => {
		var theTrack = new TrackImpl();
		return theTrack;
	}
	public createTalk = () : Talk => {
		var theTalk = new TalkImpl();
		return theTalk;
	}
	public createConference = () : Conference => {
		var theConference = new ConferenceImpl();
		return theConference;
	}
	public createVenue = () : Venue => {
		var theVenue = new VenueImpl();
		return theVenue;
	}
}
