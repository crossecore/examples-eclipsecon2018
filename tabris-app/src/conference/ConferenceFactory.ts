export interface ConferenceFactory extends EFactory{
	createRoom():Room;
	createPerson():Person;
	createOrganization():Organization;
	createTrack():Track;
	createTalk():Talk;
	createConference():Conference;
	createVenue():Venue;
}
import {EFactory} from "ecore/EFactory";
import {Conference} from "conference/Conference";
import {Room} from "conference/Room";
import {Track} from "conference/Track";
import {Talk} from "conference/Talk";
import {Venue} from "conference/Venue";
import {Person} from "conference/Person";
import {Organization} from "conference/Organization";
