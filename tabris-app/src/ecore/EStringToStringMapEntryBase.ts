/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */
import {EStringToStringMapEntry} from "./EStringToStringMapEntry";
import {InternalEObject} from "./InternalEObject";
import {ENotificationImpl} from "./ENotificationImpl";
import {BasicEObjectImpl} from "./BasicEObjectImpl";
import {OrderedSet} from "./OrderedSet";
import {NotificationChain} from "./NotificationChain";
import {EcorePackageLiterals} from "./EcorePackageLiterals";
import {EClass} from "./EClass";
import {NotificationImpl} from "./NotificationImpl";
///<summary>This class was generated.</summary>
export class EStringToStringMapEntryBase
extends BasicEObjectImpl
implements EStringToStringMapEntry

{
	private _key:string = "";
	get key():string{
		return this._key;
	}
	set key(value:string){
		this._key = value; 
	}
	private _value:string = "";
	get value():string{
		return this._value;
	}
	set value(value:string){
		this._value = value; 
	}


	protected eStaticClass():EClass{
		//return EcorePackageLiterals.ESTRINGTOSTRINGMAPENTRY;
		return null;
	}



	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
		switch (featureID) {
			case EcorePackageLiterals.ESTRINGTOSTRINGMAPENTRY_KEY:
				return this.key;
			case EcorePackageLiterals.ESTRINGTOSTRINGMAPENTRY_VALUE:
				return this.value;
		}
		//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromEStringToStringMapEntry = this.eGet;
}


