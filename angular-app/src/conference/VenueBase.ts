import {ConferencePackageLiterals} from "conference/ConferencePackageLiterals";
import {ENotificationImpl} from "ecore/ENotificationImpl";
import {Room} from "conference/Room";
import {BasicEObjectImpl} from "ecore/BasicEObjectImpl";
import {EClass} from "ecore/EClass";
import {InternalEObject} from "ecore/InternalEObject";
import {OrderedSet} from "ecore/OrderedSet";
import {NotificationImpl} from "ecore/NotificationImpl";
import {Venue} from "conference/Venue";
import {NotificationChain} from "ecore/NotificationChain";
//import ENotificationImpl = Ecore.ENotificationImpl;
//import EClass = Ecore.EClass;
export class VenueBase
extends BasicEObjectImpl
implements Venue
{
	private _name:string = "";
	get name():string{
		return this._name;
	}
	set name(value:string){
		this._name = value; 
	}
	private _rooms:OrderedSet<Room> = null;
	get rooms():OrderedSet<Room>{
		if(this._rooms===null){
			this._rooms = new OrderedSet<Room>(this, ConferencePackageLiterals.VENUE_ROOMS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - ConferencePackageLiterals.VENUE_ROOMS);
				
		}
		return this._rooms;
		
	}
	
	


	/* do not override from BasicEObject!
	protected eStaticClass():EClass{
		//return ConferencePackageLiterals.VENUE;
		return null;
	}
	*/



	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
		switch (featureID) {
			case ConferencePackageLiterals.VENUE_NAME:
				return this.name;
			case ConferencePackageLiterals.VENUE_ROOMS:
				return this.rooms;
		}
		//return this.eGetFromNamedElement(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromVenue = this.eGet;
	
}

