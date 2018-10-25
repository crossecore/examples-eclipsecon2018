import {ConferencePackageLiterals} from "../conference/ConferencePackageLiterals";
import {AbstractCollection} from "../ecore/AbstractCollection";
import {ENotificationImpl} from "../ecore/ENotificationImpl";
import {Room} from "../conference/Room";
import {BasicEObjectImpl} from "../ecore/BasicEObjectImpl";
import {EClass} from "../ecore/EClass";
import {InternalEObject} from "../ecore/InternalEObject";
import {OrderedSet} from "../ecore/OrderedSet";
import {EObject} from "../ecore/EObject";
import {NotificationImpl} from "../ecore/NotificationImpl";
import {Venue} from "../conference/Venue";
import {NotificationChain} from "../ecore/NotificationChain";
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
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case ConferencePackageLiterals.VENUE_NAME:
							return this.name;
						case ConferencePackageLiterals.VENUE_ROOMS:
							return this.rooms;
					}
					//return this.eGetFromNamedElement(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case ConferencePackageLiterals.VENUE_NAME:
							this.name = <string> newValue;
							return;
						case ConferencePackageLiterals.VENUE_ROOMS:
							this.rooms.clear();
							this.rooms.concat((newValue as AbstractCollection<EObject>).map(i => i as Room));
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			
