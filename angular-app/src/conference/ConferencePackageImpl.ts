import {EAttribute} from "ecore/EAttribute";
import {EReference} from "ecore/EReference";
import {ConferenceFactoryImpl} from "conference/ConferenceFactoryImpl";
import {ConferencePackage} from "conference/ConferencePackage";
import {EOperation} from "ecore/EOperation";
import {EFactory} from "ecore/EFactory";
import {EPackageImpl} from "ecore/EPackageImpl";
import {EClass} from "ecore/EClass";
import {EcorePackageImpl} from 'ecore/EcorePackageImpl';
import {EcoreFactoryImpl} from 'ecore/EcoreFactoryImpl';
export class ConferencePackageImpl extends EPackageImpl implements ConferencePackage{
		public static eNAME:string = "conference";
		
		public static eNS_URI:string = "conference";
		
		public static eNS_PREFIX:string = "conference";
		
		
		
		/*
		constructor(){
			//no private constructors in TypeScript
			super(ConferencePackageImpl.eNS_URI, ConferenceFactoryImpl.eINSTANCE as any as EFactory);
		}
		*/
		
		public static init():ConferencePackage
		{

	        // Obtain or create and register package
	        let theConferencePackage = new ConferencePackageImpl();
	        theConferencePackage.ecorePackage = EcorePackageImpl.eINSTANCE;
	        theConferencePackage.ecoreFactory = EcoreFactoryImpl.eINSTANCE;
	
	        // Create package meta-data objects
	        theConferencePackage.createPackageContents();
	
	        // Initialize created meta-data
	        theConferencePackage.initializePackageContents();

	        return theConferencePackage;
        }
        
        private isCreated:boolean = false;
        
        public createPackageContents = ():void =>
        {
            if (this.isCreated) return;
            this.isCreated = true;
			this.RoomEClass = this.createEClass(ConferencePackageImpl.ROOM);
			this.PersonEClass = this.createEClass(ConferencePackageImpl.PERSON);
			this.createEReference(this.PersonEClass, ConferencePackageImpl.PERSON_WORKSFOR);
			this.createEAttribute(this.PersonEClass, ConferencePackageImpl.PERSON_FIRSTNAME);
			this.createEAttribute(this.PersonEClass, ConferencePackageImpl.PERSON_LASTNAME);
			this.createEReference(this.PersonEClass, ConferencePackageImpl.PERSON_GIVES);
			this.createEReference(this.PersonEClass, ConferencePackageImpl.PERSON_ATTENDS);
			this.createEOperation(this.PersonEClass, ConferencePackageImpl.PERSON___MEETSPERSONAT__OTHER);
			this.OrganizationEClass = this.createEClass(ConferencePackageImpl.ORGANIZATION);
			this.TrackEClass = this.createEClass(ConferencePackageImpl.TRACK);
			this.createEReference(this.TrackEClass, ConferencePackageImpl.TRACK_TALKS);
			this.createEReference(this.TrackEClass, ConferencePackageImpl.TRACK_CONFERENCE);
			this.TalkEClass = this.createEClass(ConferencePackageImpl.TALK);
			this.createEAttribute(this.TalkEClass, ConferencePackageImpl.TALK_TITLE);
			this.createEAttribute(this.TalkEClass, ConferencePackageImpl.TALK_TIMEBEGIN);
			this.createEAttribute(this.TalkEClass, ConferencePackageImpl.TALK_TIMEEND);
			this.createEReference(this.TalkEClass, ConferencePackageImpl.TALK_TRACK);
			this.createEReference(this.TalkEClass, ConferencePackageImpl.TALK_ROOM);
			this.createEReference(this.TalkEClass, ConferencePackageImpl.TALK_SPEAKERS);
			this.createEReference(this.TalkEClass, ConferencePackageImpl.TALK_ATTENDEES);
			this.ConferenceEClass = this.createEClass(ConferencePackageImpl.CONFERENCE);
			this.createEReference(this.ConferenceEClass, ConferencePackageImpl.CONFERENCE_VENUE);
			this.createEReference(this.ConferenceEClass, ConferencePackageImpl.CONFERENCE_TALKS);
			this.createEReference(this.ConferenceEClass, ConferencePackageImpl.CONFERENCE_ATTENDEES);
			this.createEReference(this.ConferenceEClass, ConferencePackageImpl.CONFERENCE_TRACKS);
			this.createEReference(this.ConferenceEClass, ConferencePackageImpl.CONFERENCE_ORGANIZATIONS);
			this.VenueEClass = this.createEClass(ConferencePackageImpl.VENUE);
			this.createEReference(this.VenueEClass, ConferencePackageImpl.VENUE_ROOMS);
			this.NamedElementEClass = this.createEClass(ConferencePackageImpl.NAMEDELEMENT);
			this.createEAttribute(this.NamedElementEClass, ConferencePackageImpl.NAMEDELEMENT_NAME);
			
			
        }
        private isInitialized:boolean = false;
        public initializePackageContents=():void =>
        {
            if (this.isInitialized) return;
            this.isInitialized = true;
            // Initialize package
            let name = ConferencePackageImpl.eNAME;
            let nsPrefix = ConferencePackageImpl.eNS_PREFIX;
            let nsURI = ConferencePackageImpl.eNS_URI;

			
			this.RoomEClass.eSuperTypes.add(this.getNamedElement());
			
			
			this.OrganizationEClass.eSuperTypes.add(this.getNamedElement());
			
			this.TrackEClass.eSuperTypes.add(this.getNamedElement());
			
			
			this.ConferenceEClass.eSuperTypes.add(this.getNamedElement());
			
			this.VenueEClass.eSuperTypes.add(this.getNamedElement());
			
			var op:EOperation = null;
			
			this.initEClass(
			this.RoomEClass, 
			/*Room*/ null, 
			"Room", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);						
			
			
			
			
			
			this.initEClass(
			this.PersonEClass, 
			/*Person*/ null, 
			"Person", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);						
			
			this.initEAttribute_EClassifier(
				this.getPerson_FirstName(), 
				this.ecorePackage.getEString(), 
				"firstName", 
				null, 
				0, 
				1, 
				/*EAttribute*/null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getPerson_LastName(), 
				this.ecorePackage.getEString(), 
				"lastName", 
				null, 
				0, 
				1, 
				/*EAttribute*/null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			this.initEReference(
				this.getPerson_WorksFor(),
				this.getOrganization(), 
				null, 
				"worksFor", 
				null, 
				0, 
				1, 
				/*Person*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getPerson_Gives(),
				this.getTalk(), 
				this.getTalk_Speakers(), 
				"gives", 
				null, 
				0, 
				-1, 
				/*Person*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getPerson_Attends(),
				this.getTalk(), 
				this.getTalk_Attendees(), 
				"attends", 
				null, 
				0, 
				-1, 
				/*Person*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			//TODO add initEOperation to EPackageImpl
			op = this.initEOperation_3(this.getPerson__MeetsPersonAt__Other(), null, "meetsPersonAt", 0, -1, EPackageImpl.IS_UNIQUE, !EPackageImpl.IS_ORDERED);
			//TODO add addEParameter to EPackageImpl
			//this.addEParameter_3(op, this.getPerson(), "other", 0, 1, EPackageImpl.IS_UNIQUE, !EPackageImpl.IS_ORDERED);
			
			
			this.initEClass(
			this.OrganizationEClass, 
			/*Organization*/ null, 
			"Organization", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);						
			
			
			
			
			
			this.initEClass(
			this.TrackEClass, 
			/*Track*/ null, 
			"Track", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);						
			
			
			this.initEReference(
				this.getTrack_Talks(),
				this.getTalk(), 
				null, 
				"talks", 
				null, 
				0, 
				-1, 
				/*Track*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTrack_Conference(),
				this.getConference(), 
				this.getConference_Tracks(), 
				"conference", 
				null, 
				0, 
				1, 
				/*Track*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.TalkEClass, 
			/*Talk*/ null, 
			"Talk", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);						
			
			this.initEAttribute_EClassifier(
				this.getTalk_Title(), 
				this.ecorePackage.getEString(), 
				"title", 
				null, 
				0, 
				1, 
				/*EAttribute*/null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getTalk_TimeBegin(), 
				this.ecorePackage.getEDate(), 
				"timeBegin", 
				null, 
				0, 
				1, 
				/*EAttribute*/null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEAttribute_EClassifier(
				this.getTalk_TimeEnd(), 
				this.ecorePackage.getEDate(), 
				"timeEnd", 
				null, 
				0, 
				1, 
				/*EAttribute*/null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			this.initEReference(
				this.getTalk_Track(),
				this.getTrack(), 
				null, 
				"track", 
				null, 
				0, 
				1, 
				/*Talk*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTalk_Room(),
				this.getRoom(), 
				null, 
				"room", 
				null, 
				0, 
				1, 
				/*Talk*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTalk_Speakers(),
				this.getPerson(), 
				this.getPerson_Gives(), 
				"speakers", 
				null, 
				0, 
				-1, 
				/*Talk*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getTalk_Attendees(),
				this.getPerson(), 
				this.getPerson_Attends(), 
				"attendees", 
				null, 
				0, 
				-1, 
				/*Talk*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.ConferenceEClass, 
			/*Conference*/ null, 
			"Conference", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);						
			
			
			this.initEReference(
				this.getConference_Venue(),
				this.getVenue(), 
				null, 
				"venue", 
				null, 
				0, 
				1, 
				/*Conference*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getConference_Talks(),
				this.getTalk(), 
				null, 
				"talks", 
				null, 
				0, 
				-1, 
				/*Conference*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getConference_Attendees(),
				this.getPerson(), 
				null, 
				"attendees", 
				null, 
				0, 
				1, 
				/*Conference*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getConference_Tracks(),
				this.getTrack(), 
				this.getTrack_Conference(), 
				"tracks", 
				null, 
				0, 
				-1, 
				/*Conference*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			this.initEReference(
				this.getConference_Organizations(),
				this.getOrganization(), 
				null, 
				"organizations", 
				null, 
				0, 
				-1, 
				/*Conference*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.VenueEClass, 
			/*Venue*/ null, 
			"Venue", 
			!EPackageImpl.IS_ABSTRACT, 
			!EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);						
			
			
			this.initEReference(
				this.getVenue_Rooms(),
				this.getRoom(), 
				null, 
				"rooms", 
				null, 
				0, 
				-1, 
				/*Venue*/ null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				EPackageImpl.IS_COMPOSITE, 
				EPackageImpl.IS_RESOLVE_PROXIES, 
				!EPackageImpl.IS_UNSETTABLE, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			this.initEClass(
			this.NamedElementEClass, 
			/*NamedElement*/ null, 
			"NamedElement", 
			EPackageImpl.IS_ABSTRACT, 
			EPackageImpl.IS_INTERFACE, 
			EPackageImpl.IS_GENERATED_INSTANCE_CLASS);						
			
			this.initEAttribute_EClassifier(
				this.getNamedElement_Name(), 
				this.ecorePackage.getEString(), 
				"name", 
				null, 
				0, 
				1, 
				/*EAttribute*/null, 
				!EPackageImpl.IS_TRANSIENT, 
				!EPackageImpl.IS_VOLATILE, 
				EPackageImpl.IS_CHANGEABLE, 
				!EPackageImpl.IS_UNSETTABLE, 
				!EPackageImpl.IS_ID, 
				EPackageImpl.IS_UNIQUE, 
				!EPackageImpl.IS_DERIVED, 
				EPackageImpl.IS_ORDERED);
			
			
			
			
        }
		
		
		private RoomEClass:EClass = null;
		private PersonEClass:EClass = null;
		private OrganizationEClass:EClass = null;
		private TrackEClass:EClass = null;
		private TalkEClass:EClass = null;
		private ConferenceEClass:EClass = null;
		private VenueEClass:EClass = null;
		private NamedElementEClass:EClass = null;
		
		
		
		
		
		public static NAMEDELEMENT:number = 7;
		public static NAMEDELEMENT_FEATURE_COUNT:number = 1;
		public static NAMEDELEMENT_OPERATION_COUNT:number = 0;
		
		public static NAMEDELEMENT_NAME:number = 0;
		
		public static ROOM:number = 0;
		public static ROOM_FEATURE_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_FEATURE_COUNT + 0;
		public static ROOM_OPERATION_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_OPERATION_COUNT + 0;
		
		public static ROOM_NAME:number = 0;
		
		public static PERSON:number = 1;
		public static PERSON_FEATURE_COUNT:number = 5;
		public static PERSON_OPERATION_COUNT:number = 1;
		
		public static PERSON_WORKSFOR:number = 0;
		public static PERSON_FIRSTNAME:number = 1;
		public static PERSON_LASTNAME:number = 2;
		public static PERSON_GIVES:number = 3;
		public static PERSON_ATTENDS:number = 4;
		public static PERSON___MEETSPERSONAT__OTHER:number = 0; 
		
		public static ORGANIZATION:number = 2;
		public static ORGANIZATION_FEATURE_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_FEATURE_COUNT + 0;
		public static ORGANIZATION_OPERATION_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_OPERATION_COUNT + 0;
		
		public static ORGANIZATION_NAME:number = 0;
		
		public static TRACK:number = 3;
		public static TRACK_FEATURE_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_FEATURE_COUNT + 2;
		public static TRACK_OPERATION_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_OPERATION_COUNT + 0;
		
		public static TRACK_NAME:number = 0;
		public static TRACK_TALKS:number = 1;
		public static TRACK_CONFERENCE:number = 2;
		
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
		public static CONFERENCE_FEATURE_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_FEATURE_COUNT + 5;
		public static CONFERENCE_OPERATION_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_OPERATION_COUNT + 0;
		
		public static CONFERENCE_NAME:number = 0;
		public static CONFERENCE_VENUE:number = 1;
		public static CONFERENCE_TALKS:number = 2;
		public static CONFERENCE_ATTENDEES:number = 3;
		public static CONFERENCE_TRACKS:number = 4;
		public static CONFERENCE_ORGANIZATIONS:number = 5;
		
		public static VENUE:number = 6;
		public static VENUE_FEATURE_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_FEATURE_COUNT + 1;
		public static VENUE_OPERATION_COUNT:number = ConferencePackageImpl.NAMEDELEMENT_OPERATION_COUNT + 0;
		
		public static VENUE_NAME:number = 0;
		public static VENUE_ROOMS:number = 1;
		
		
		/*Important: Call init() AFTER metaobject ids have been assigned.*/
		public static eINSTANCE:ConferencePackage = ConferencePackageImpl.init();
		
		
		public getNamedElement=():EClass=>{return this.NamedElementEClass;}
		
		public getNamedElement_Name=():EAttribute=>{return <EAttribute> this.NamedElementEClass.eStructuralFeatures.at(0);}
		public getRoom=():EClass=>{return this.RoomEClass;}
		
		public getPerson=():EClass=>{return this.PersonEClass;}
		
		public getPerson_WorksFor=():EReference=>{return <EReference> this.PersonEClass.eStructuralFeatures.at(0);}
		public getPerson_FirstName=():EAttribute=>{return <EAttribute> this.PersonEClass.eStructuralFeatures.at(1);}
		public getPerson_LastName=():EAttribute=>{return <EAttribute> this.PersonEClass.eStructuralFeatures.at(2);}
		public getPerson_Gives=():EReference=>{return <EReference> this.PersonEClass.eStructuralFeatures.at(3);}
		public getPerson_Attends=():EReference=>{return <EReference> this.PersonEClass.eStructuralFeatures.at(4);}
		public getPerson__MeetsPersonAt__Other=():EOperation=>{return <EOperation> this.PersonEClass.eOperations.at(0);}
		public getOrganization=():EClass=>{return this.OrganizationEClass;}
		
		public getTrack=():EClass=>{return this.TrackEClass;}
		
		public getTrack_Talks=():EReference=>{return <EReference> this.TrackEClass.eStructuralFeatures.at(0);}
		public getTrack_Conference=():EReference=>{return <EReference> this.TrackEClass.eStructuralFeatures.at(1);}
		public getTalk=():EClass=>{return this.TalkEClass;}
		
		public getTalk_Title=():EAttribute=>{return <EAttribute> this.TalkEClass.eStructuralFeatures.at(0);}
		public getTalk_TimeBegin=():EAttribute=>{return <EAttribute> this.TalkEClass.eStructuralFeatures.at(1);}
		public getTalk_TimeEnd=():EAttribute=>{return <EAttribute> this.TalkEClass.eStructuralFeatures.at(2);}
		public getTalk_Track=():EReference=>{return <EReference> this.TalkEClass.eStructuralFeatures.at(3);}
		public getTalk_Room=():EReference=>{return <EReference> this.TalkEClass.eStructuralFeatures.at(4);}
		public getTalk_Speakers=():EReference=>{return <EReference> this.TalkEClass.eStructuralFeatures.at(5);}
		public getTalk_Attendees=():EReference=>{return <EReference> this.TalkEClass.eStructuralFeatures.at(6);}
		public getConference=():EClass=>{return this.ConferenceEClass;}
		
		public getConference_Venue=():EReference=>{return <EReference> this.ConferenceEClass.eStructuralFeatures.at(0);}
		public getConference_Talks=():EReference=>{return <EReference> this.ConferenceEClass.eStructuralFeatures.at(1);}
		public getConference_Attendees=():EReference=>{return <EReference> this.ConferenceEClass.eStructuralFeatures.at(2);}
		public getConference_Tracks=():EReference=>{return <EReference> this.ConferenceEClass.eStructuralFeatures.at(3);}
		public getConference_Organizations=():EReference=>{return <EReference> this.ConferenceEClass.eStructuralFeatures.at(4);}
		public getVenue=():EClass=>{return this.VenueEClass;}
		
		public getVenue_Rooms=():EReference=>{return <EReference> this.VenueEClass.eStructuralFeatures.at(0);}
		
		/*
		public static Literals = {
			ROOM: ConferencePackageImpl.eINSTANCE.getRoom(), 
			
			PERSON: ConferencePackageImpl.eINSTANCE.getPerson(), 
			
			ORGANIZATION: ConferencePackageImpl.eINSTANCE.getOrganization(), 
			
			TRACK: ConferencePackageImpl.eINSTANCE.getTrack(), 
			
			TALK: ConferencePackageImpl.eINSTANCE.getTalk(), 
			
			CONFERENCE: ConferencePackageImpl.eINSTANCE.getConference(), 
			
			VENUE: ConferencePackageImpl.eINSTANCE.getVenue(), 
			
			NAMEDELEMENT: ConferencePackageImpl.eINSTANCE.getNamedElement(), 
			
			NAMEDELEMENT_NAME: ConferencePackageImpl.eINSTANCE.getNamedElement_Name(), 
			PERSON_WORKSFOR: ConferencePackageImpl.eINSTANCE.getPerson_WorksFor(), 
			PERSON_FIRSTNAME: ConferencePackageImpl.eINSTANCE.getPerson_FirstName(), 
			PERSON_LASTNAME: ConferencePackageImpl.eINSTANCE.getPerson_LastName(), 
			PERSON_GIVES: ConferencePackageImpl.eINSTANCE.getPerson_Gives(), 
			PERSON_ATTENDS: ConferencePackageImpl.eINSTANCE.getPerson_Attends(), 
			TRACK_TALKS: ConferencePackageImpl.eINSTANCE.getTrack_Talks(), 
			TRACK_CONFERENCE: ConferencePackageImpl.eINSTANCE.getTrack_Conference(), 
			TALK_TITLE: ConferencePackageImpl.eINSTANCE.getTalk_Title(), 
			TALK_TIMEBEGIN: ConferencePackageImpl.eINSTANCE.getTalk_TimeBegin(), 
			TALK_TIMEEND: ConferencePackageImpl.eINSTANCE.getTalk_TimeEnd(), 
			TALK_TRACK: ConferencePackageImpl.eINSTANCE.getTalk_Track(), 
			TALK_ROOM: ConferencePackageImpl.eINSTANCE.getTalk_Room(), 
			TALK_SPEAKERS: ConferencePackageImpl.eINSTANCE.getTalk_Speakers(), 
			TALK_ATTENDEES: ConferencePackageImpl.eINSTANCE.getTalk_Attendees(), 
			CONFERENCE_VENUE: ConferencePackageImpl.eINSTANCE.getConference_Venue(), 
			CONFERENCE_TALKS: ConferencePackageImpl.eINSTANCE.getConference_Talks(), 
			CONFERENCE_ATTENDEES: ConferencePackageImpl.eINSTANCE.getConference_Attendees(), 
			CONFERENCE_TRACKS: ConferencePackageImpl.eINSTANCE.getConference_Tracks(), 
			CONFERENCE_ORGANIZATIONS: ConferencePackageImpl.eINSTANCE.getConference_Organizations(), 
			VENUE_ROOMS: ConferencePackageImpl.eINSTANCE.getVenue_Rooms()
		}
		*/
		

 
}
