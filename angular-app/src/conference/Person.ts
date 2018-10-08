import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {Talk} from "conference/Talk";
import {Organization} from "conference/Organization";
import {Person} from "conference/Person";

export interface Person
extends InternalEObject

{
	firstName:string;
	lastName:string;
	
	worksFor:Organization;
	gives: OrderedSet<Talk>;
	attends: OrderedSet<Talk>;
	
	
	meetsPersonAt(other:Person): Talk ;

}

