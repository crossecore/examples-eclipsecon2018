/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

import {EAttribute} from "./EAttribute";
import {EAnnotation} from "./EAnnotation";
import {EDataType} from "./EDataType";
import {InternalEObject} from "./InternalEObject";
import {ENotificationImpl} from "./ENotificationImpl";
import {BasicEObjectImpl} from "./BasicEObjectImpl";
import {OrderedSet} from "./OrderedSet";
import {NotificationChain} from "./NotificationChain";
import {EcorePackageLiterals} from "./EcorePackageLiterals";
import {EcorePackageImpl} from "./EcorePackageImpl";
import {EStructuralFeatureImpl} from "./EStructuralFeatureImpl";
import {EClass} from "./EClass";
import {NotificationImpl} from "./NotificationImpl";
///<summary>This class was generated.</summary>
export class EAttributeBase
extends EStructuralFeatureImpl
implements EAttribute

{
	private _iD:boolean = false;
	get iD():boolean{
		return this._iD;
	}
	set iD(value:boolean){
		this._iD = value; 
	}
	get eAttributeType():EDataType{
	
		//TODO implement derivation
		return null;
	}

	
	public getContainerClass(): Function {
		/*TODO implement function*/ 
		return null;
	};
	
	public getFeatureID(): number {
		/*TODO implement function*/ 
		return null;
	};
	
	public getEAnnotation(source:string): EAnnotation {
		/*TODO implement function*/ 
		return null;
	};

	protected eStaticClass():EClass{
		return EcorePackageImpl.eINSTANCE.getEAnnotation_();
		//return null;
	}



	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
		switch (featureID) {
			case EcorePackageLiterals.EATTRIBUTE_EANNOTATIONS:
				return this.eAnnotations;
			case EcorePackageLiterals.EATTRIBUTE_NAME:
				return this.name;
			case EcorePackageLiterals.EATTRIBUTE_ORDERED:
				return this.ordered;
			case EcorePackageLiterals.EATTRIBUTE_UNIQUE:
				return this.unique;
			case EcorePackageLiterals.EATTRIBUTE_LOWERBOUND:
				return this.lowerBound;
			case EcorePackageLiterals.EATTRIBUTE_UPPERBOUND:
				return this.upperBound;
			case EcorePackageLiterals.EATTRIBUTE_MANY:
				return this.many;
			case EcorePackageLiterals.EATTRIBUTE_REQUIRED:
				return this.required;
			case EcorePackageLiterals.EATTRIBUTE_ETYPE:
				return this.eType;
			case EcorePackageLiterals.EATTRIBUTE_EGENERICTYPE:
				return this.eGenericType;
			case EcorePackageLiterals.EATTRIBUTE_CHANGEABLE:
				return this.changeable;
			case EcorePackageLiterals.EATTRIBUTE_VOLATILE:
				return this.volatile;
			case EcorePackageLiterals.EATTRIBUTE_TRANSIENT:
				return this.transient;
			case EcorePackageLiterals.EATTRIBUTE_DEFAULTVALUELITERAL:
				return this.defaultValueLiteral;
			case EcorePackageLiterals.EATTRIBUTE_DEFAULTVALUE:
				return this.defaultValue;
			case EcorePackageLiterals.EATTRIBUTE_UNSETTABLE:
				return this.unsettable;
			case EcorePackageLiterals.EATTRIBUTE_DERIVED:
				return this.derived;
			case EcorePackageLiterals.EATTRIBUTE_ECONTAININGCLASS:
				return this.eContainingClass;
			case EcorePackageLiterals.EATTRIBUTE_ID:
				return this.iD;
			case EcorePackageLiterals.EATTRIBUTE_EATTRIBUTETYPE:
				return this.eAttributeType;
		}
		//return this.eGetFromEStructuralFeature(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromEAttribute = this.eGet;
}

