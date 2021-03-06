import {InternalEObject} from "../ecore/InternalEObject";
import {OrderedSet} from "../ecore/OrderedSet";
import {ConferencePackageLiterals} from "../conference/ConferencePackageLiterals";
import {ENotificationImpl} from "../ecore/ENotificationImpl";
import {NotificationImpl} from "../ecore/NotificationImpl";
import {Room} from "../conference/Room";
import {BasicEObjectImpl} from "../ecore/BasicEObjectImpl";
import {EClass} from "../ecore/EClass";
import {NotificationChain} from "../ecore/NotificationChain";
//import ENotificationImpl = Ecore.ENotificationImpl;
//import EClass = Ecore.EClass;
		
			export class RoomBase
			extends BasicEObjectImpl
			implements Room
			{
				private _name:string = "";
				get name():string{
					return this._name;
				}
				set name(value:string){
					this._name = value; 
				}

			
				/* do not override from BasicEObject!
				protected eStaticClass():EClass{
					//return ConferencePackageLiterals.ROOM;
					return null;
				}
				*/
			
			
			
				public eGet_number_boolean_boolean(featureID:number, resolve:boolean, coreType:boolean):any{
					switch (featureID) {
						case ConferencePackageLiterals.ROOM_NAME:
							return this.name;
					}
					//return this.eGetFromNamedElement(featureID, resolve, coreType);
					return super.eGet(featureID, resolve, coreType);
				}
				
				public eSet_number_any(featureID:number, newValue:any):void {
					switch (featureID) {
						case ConferencePackageLiterals.ROOM_NAME:
							this.name = <string> newValue;
							return;
					}
					super.eSet_number_any(featureID, newValue);
				}

				
			}
			
