import {NamedElement} from "../conference/NamedElement";
import {OrderedSet} from "../ecore/OrderedSet";
import {Room} from "../conference/Room";

export interface Venue
extends NamedElement

{
	
	rooms: OrderedSet<Room>;
	

}

