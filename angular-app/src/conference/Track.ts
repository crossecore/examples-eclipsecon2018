import {Conference} from "conference/Conference";
import {NamedElement} from "conference/NamedElement";
import {OrderedSet} from "ecore/OrderedSet";
import {Talk} from "conference/Talk";

export interface Track
extends NamedElement

{
	
	talks: OrderedSet<Talk>;
	conference:Conference;
	

}

