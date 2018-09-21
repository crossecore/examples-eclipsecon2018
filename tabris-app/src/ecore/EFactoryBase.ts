/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */
import {EFactory} from "./EFactory";
import {EAnnotation} from "./EAnnotation";
import {EPackage} from "./EPackage";
import {EDataType} from "./EDataType";
import {InternalEObject} from "./InternalEObject";
import {ENotificationImpl} from "./ENotificationImpl";
import {BasicEObjectImpl} from "./BasicEObjectImpl";
import {OrderedSet} from "./OrderedSet";
import {EObject} from "./EObject";
import {EModelElementImpl} from "./EModelElementImpl";
import {NotificationChain} from "./NotificationChain";
import {EcorePackageLiterals} from "./EcorePackageLiterals";
import {EClass} from "./EClass";
import {NotificationImpl} from "./NotificationImpl";
///<summary>This class was generated.</summary>
export class EFactoryBase
extends EModelElementImpl
implements EFactory

{
	private _ePackage:EPackage = null;
	get ePackage():EPackage{
	
		return this._ePackage;
	}
	set ePackage(value:EPackage) {
		if (value != this._ePackage) {
			let msgs:NotificationChain = null;
			if (this._ePackage != null){
				msgs = (this._ePackage).eInverseRemove(this, EcorePackageLiterals.EPACKAGE_EFACTORYINSTANCE, /*EFactory*/ null , msgs);
			}
			if (value != null){
				msgs = value.eInverseAdd(this, EcorePackageLiterals.EPACKAGE_EFACTORYINSTANCE, /*EFactory*/ null, msgs);
			}
			msgs = this.basicSetEPackage(value, msgs);
			if (msgs != null) {
				msgs.dispatch();
			}
		}
		else if (this.eNotificationRequired()){
			this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,EcorePackageLiterals.EFACTORY_EPACKAGE , value, value));
		}
	}

	
	public createFromString(eDataType:EDataType, literalValue:string): any {
		/*TODO implement function*/ 
		return null;
	};
	
	public create(eClass:EClass): EObject {
		/*TODO implement function*/ 
		return null;
	};
	
	public convertToString(eDataType:EDataType, instanceValue:any): string {
		/*TODO implement function*/ 
		return null;
	};
	
	public getEAnnotation(source:string): EAnnotation {
		/*TODO implement function*/ 
		return null;
	};

	protected eStaticClass():EClass{
		//return EcorePackageLiterals.EFACTORY;
		return null;
	}

	public eInverseAdd(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain): NotificationChain{
		switch (featureID) {
			case EcorePackageLiterals.EFACTORY_EPACKAGE:
				if (this._ePackage != null){
					msgs = this._ePackage.eInverseRemove(this, EcorePackageLiterals.EFACTORY_EPACKAGE, /*EPackage*/ null, msgs);
				}
				return this.basicSetEPackage(otherEnd as EPackage, msgs);
		}
		//return this.eInverseAddFromEModelElement(otherEnd, featureID, msgs);
		return super.eInverseAdd(otherEnd, featureID, msgs);
	}
	//public eInverseAddFromEFactory = this.eInverseAdd;
	
	public eInverseRemove(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain):NotificationChain{
		switch (featureID) {
			case EcorePackageLiterals.EFACTORY_EPACKAGE:
				return this.basicSetEPackage(null, msgs);
		}
		//return this.eInverseRemoveFromEModelElement(otherEnd, featureID, msgs);
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}
	
	//public eInverseRemoveFromEFactory = this.eInverseRemove;

	public basicSetEPackage(newobj:EPackage, msgs:NotificationChain):NotificationChain {
		let oldobj = this._ePackage;
		this._ePackage = newobj;
		if (this.eNotificationRequired()) {
			let notification = new ENotificationImpl(this, NotificationImpl.SET, EcorePackageLiterals.EFACTORY_EPACKAGE, oldobj, newobj);
			if (msgs == null){
				msgs = notification;
			}
			else{
				msgs.add(notification);
			}
		}
		return msgs;
	}
	

	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
		switch (featureID) {
			case EcorePackageLiterals.EFACTORY_EANNOTATIONS:
				return this.eAnnotations;
			case EcorePackageLiterals.EFACTORY_EPACKAGE:
				return this.ePackage;
		}
		//return this.eGetFromEModelElement(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromEFactory = this.eGet;
}


