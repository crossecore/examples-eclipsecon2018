export class ConferencePackageLiterals{
	public static NAMEDELEMENT:number = 7;
	public static NAMEDELEMENT_FEATURE_COUNT:number = 1;
	public static NAMEDELEMENT_OPERATION_COUNT:number = 0;
	
	public static NAMEDELEMENT_NAME:number = 0;
	
	public static ROOM:number = 0;
	public static ROOM_FEATURE_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_FEATURE_COUNT + 0;
	public static ROOM_OPERATION_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_OPERATION_COUNT + 0;
	
	public static ROOM_NAME:number = 0;
	
	public static PERSON:number = 1;
	public static PERSON_FEATURE_COUNT:number = 3;
	public static PERSON_OPERATION_COUNT:number = 0;
	
	public static PERSON_AFFILIATION:number = 0;
	public static PERSON_FIRSTNAME:number = 1;
	public static PERSON_LASTNAME:number = 2;
	
	public static ORGANIZATION:number = 2;
	public static ORGANIZATION_FEATURE_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_FEATURE_COUNT + 0;
	public static ORGANIZATION_OPERATION_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_OPERATION_COUNT + 0;
	
	public static ORGANIZATION_NAME:number = 0;
	
	public static TRACK:number = 3;
	public static TRACK_FEATURE_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_FEATURE_COUNT + 0;
	public static TRACK_OPERATION_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_OPERATION_COUNT + 0;
	
	public static TRACK_NAME:number = 0;
	
	public static TALK:number = 4;
	public static TALK_FEATURE_COUNT:number = 7;
	public static TALK_OPERATION_COUNT:number = 0;
	
	public static TALK_TITLE:number = 0;
	public static TALK_TIMEBEGIN:number = 1;
	public static TALK_TIMEEND:number = 2;
	public static TALK_TRACK:number = 3;
	public static TALK_ROOM:number = 4;
	public static TALK_SPEAKERS:number = 5;
	public static TALK_ATTENDEES:number = 6;
	
	public static CONFERENCE:number = 5;
	public static CONFERENCE_FEATURE_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_FEATURE_COUNT + 5;
	public static CONFERENCE_OPERATION_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_OPERATION_COUNT + 0;
	
	public static CONFERENCE_NAME:number = 0;
	public static CONFERENCE_VENUE:number = 1;
	public static CONFERENCE_TALKS:number = 2;
	public static CONFERENCE_ATTENDEES:number = 3;
	public static CONFERENCE_TRACKS:number = 4;
	public static CONFERENCE_ORGANIZATIONS:number = 5;
	
	public static VENUE:number = 6;
	public static VENUE_FEATURE_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_FEATURE_COUNT + 1;
	public static VENUE_OPERATION_COUNT:number = ConferencePackageLiterals.NAMEDELEMENT_OPERATION_COUNT + 0;
	
	public static VENUE_NAME:number = 0;
	public static VENUE_ROOMS:number = 1;
	
}
