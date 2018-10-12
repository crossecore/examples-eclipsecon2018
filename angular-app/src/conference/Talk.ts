import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {Track} from "conference/Track";
import {Room} from "conference/Room";
import {Person} from "conference/Person";

export interface Talk
extends InternalEObject

{
	title:string;
	timeBegin:Date;
	timeEnd:Date;
	
	track:Track;
	room:Room;
	speakers: OrderedSet<Person>;
	attendees: OrderedSet<Person>;
	

}

