//import ENotificationImpl = Ecore.ENotificationImpl;
//import EClass = Ecore.EClass;
export class OrganizationBase
extends BasicEObjectImpl
implements Organization

{
	private _name:string = "";
	get name():string{
		return this._name;
	}
	set name(value:string){
		this._name = value; 
	}


	protected eStaticClass():EClass{
		//return ConferencePackageLiterals.ORGANIZATION;
		return null;
	}



	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
		switch (featureID) {
			case ConferencePackageLiterals.ORGANIZATION_NAME:
				return this.name;
		}
		//return this.eGetFromNamedElement(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromOrganization = this.eGet;
}

import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {ConferencePackageLiterals} from "conference/ConferencePackageLiterals";
import {ENotificationImpl} from "ecore/ENotificationImpl";
import {NotificationImpl} from "ecore/NotificationImpl";
import {BasicEObjectImpl} from "ecore/BasicEObjectImpl";
import {EClass} from "ecore/EClass";
import {NotificationChain} from "ecore/NotificationChain";
import {Organization} from "conference/Organization";
