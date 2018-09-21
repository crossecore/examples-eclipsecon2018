
export interface Person
extends InternalEObject

{
	firstName:string;
	lastName:string;
	
	affiliation:Organization;
	

}

import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {Organization} from "conference/Organization";
