
export interface Conference
extends NamedElement

{
	
	venue:Venue;
	talks: OrderedSet<Talk>;
	attendees:Person;
	tracks: OrderedSet<Track>;
	organizations: OrderedSet<Organization>;
	

}

import {NamedElement} from "conference/NamedElement";
import {OrderedSet} from "ecore/OrderedSet";
import {Talk} from "conference/Talk";
import {Track} from "conference/Track";
import {Venue} from "conference/Venue";
import {Person} from "conference/Person";
import {Organization} from "conference/Organization";
