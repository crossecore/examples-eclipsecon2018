/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */
import {EAnnotation} from "./EAnnotation";
import {EPackage} from "./EPackage";
import {ETypeParameter} from "./ETypeParameter";
import {EClassifier} from "./EClassifier";
import {InternalEObject} from "./InternalEObject";
import {ENamedElementImpl} from "./ENamedElementImpl";
import {ENotificationImpl} from "./ENotificationImpl";
import {BasicEObjectImpl} from "./BasicEObjectImpl";
import {OrderedSet} from "./OrderedSet";
import {NotificationChain} from "./NotificationChain";
import {EcorePackageLiterals} from "./EcorePackageLiterals";
import {EClass} from "./EClass";
import {NotificationImpl} from "./NotificationImpl";
///<summary>This class was generated.</summary>
export class EClassifierBase
extends ENamedElementImpl
implements EClassifier

{
	private _instanceTypeName:string = "";
	get instanceTypeName():string{
		return this._instanceTypeName;
	}
	set instanceTypeName(value:string){
		this._instanceTypeName = value; 
	}
	get instanceClass():Function{
		//TODO implement derivation
		return null;
	}
	private _instanceClassName:string = "";
	get instanceClassName():string{
		return this._instanceClassName;
	}
	set instanceClassName(value:string){
		this._instanceClassName = value; 
	}
	get defaultValue():any{
		//TODO implement derivation
		return null;
	}
	get ePackage():EPackage{
	
		if (this.eContainerFeatureID() != EcorePackageLiterals.ECLASSIFIER_EPACKAGE) return null;
		return this.eInternalContainer() as EPackage;
	}
	private _eTypeParameters:OrderedSet<ETypeParameter> = null;
	get eTypeParameters():OrderedSet<ETypeParameter>{
		if(this._eTypeParameters===null){
			this._eTypeParameters = new OrderedSet<ETypeParameter>(this, EcorePackageLiterals.ECLASSIFIER_ETYPEPARAMETERS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - EcorePackageLiterals.ECLASSIFIER_ETYPEPARAMETERS);
				
		}
		return this._eTypeParameters;
		
	}
	
	

	
	public isInstance(object:any): boolean {
		/*TODO implement function*/ 
		return null;
	};
	
	public getEAnnotation(source:string): EAnnotation {
		/*TODO implement function*/ 
		return null;
	};
	
	public getClassifierID(): number {
		/*TODO implement function*/ 
		return null;
	};

	protected eStaticClass():EClass{
		//return EcorePackageLiterals.ECLASSIFIER;
		return null;
	}

	public eInverseAdd(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain): NotificationChain{
		switch (featureID) {
			case EcorePackageLiterals.ECLASSIFIER_EPACKAGE:
				if (this.eInternalContainer() != null) {
					msgs = this.eBasicRemoveFromContainer(msgs);
				}
				return this.basicSetEPackage(otherEnd as EPackage, msgs);
		}
		//return this.eInverseAddFromENamedElement(otherEnd, featureID, msgs);
		return super.eInverseAdd(otherEnd, featureID, msgs);
	}
	//public eInverseAddFromEClassifier = this.eInverseAdd;
	
	public eInverseRemove(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain):NotificationChain{
		switch (featureID) {
			case EcorePackageLiterals.ECLASSIFIER_EPACKAGE:
				return this.basicSetEPackage(null, msgs);
		}
		//return this.eInverseRemoveFromENamedElement(otherEnd, featureID, msgs);
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}
	
	//public eInverseRemoveFromEClassifier = this.eInverseRemove;

	public basicSetEPackage(newobj:EPackage, msgs:NotificationChain):NotificationChain {
			msgs = this.eBasicSetContainer(newobj, EcorePackageLiterals.ECLASSIFIER_EPACKAGE, msgs);
			return msgs;
	}
	

	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
		switch (featureID) {
			case EcorePackageLiterals.ECLASSIFIER_EANNOTATIONS:
				return this.eAnnotations;
			case EcorePackageLiterals.ECLASSIFIER_NAME:
				return this.name;
			case EcorePackageLiterals.ECLASSIFIER_INSTANCECLASSNAME:
				return this.instanceClassName;
			case EcorePackageLiterals.ECLASSIFIER_INSTANCECLASS:
				return this.instanceClass;
			case EcorePackageLiterals.ECLASSIFIER_DEFAULTVALUE:
				return this.defaultValue;
			case EcorePackageLiterals.ECLASSIFIER_INSTANCETYPENAME:
				return this.instanceTypeName;
			case EcorePackageLiterals.ECLASSIFIER_EPACKAGE:
				return this.ePackage;
			case EcorePackageLiterals.ECLASSIFIER_ETYPEPARAMETERS:
				return this.eTypeParameters;
		}
		//return this.eGetFromENamedElement(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromEClassifier = this.eGet;
}


