/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>

import {EModelElement} from "./EModelElement";
import {EAnnotation} from "./EAnnotation";
import {EStringToStringMapEntry} from "./EStringToStringMapEntry";
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
export class EAnnotationBase
extends EModelElementImpl
implements EAnnotation

{
	private _source:string = "";
	get source():string{
		return this._source;
	}
	set source(value:string){
		this._source = value; 
	}
	private _details:OrderedSet<EStringToStringMapEntry> = null;
	get details():OrderedSet<EStringToStringMapEntry>{
		if(this._details===null){
			this._details = new OrderedSet<EStringToStringMapEntry>(this, EcorePackageLiterals.EANNOTATION_DETAILS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - EcorePackageLiterals.EANNOTATION_DETAILS);
				
		}
		return this._details;
		
	}
	
	
	private _contents:OrderedSet<EObject> = null;
	get contents():OrderedSet<EObject>{
		if(this._contents===null){
			this._contents = new OrderedSet<EObject>(this, EcorePackageLiterals.EANNOTATION_CONTENTS, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - EcorePackageLiterals.EANNOTATION_CONTENTS);
				
		}
		return this._contents;
		
	}
	
	
	private _references:OrderedSet<EObject> = null;
	get references():OrderedSet<EObject>{
		if(this._references===null){
			this._references = new OrderedSet<EObject>(this, EcorePackageLiterals.EANNOTATION_REFERENCES, BasicEObjectImpl.EOPPOSITE_FEATURE_BASE - EcorePackageLiterals.EANNOTATION_REFERENCES);
				
		}
		return this._references;
		
	}
	
	
	get eModelElement():EModelElement{
	
		if (this.eContainerFeatureID() != EcorePackageLiterals.EANNOTATION_EMODELELEMENT) return null;
		return this.eInternalContainer() as EModelElement;
	}
	set eModelElement(value:EModelElement) {
		if (value != this.eInternalContainer() as EModelElement) {
			let msgs:NotificationChain = null;
			if (this.eInternalContainer() as EModelElement != null){
				msgs = (this.eInternalContainer() as EModelElement).eInverseRemove(this, EcorePackageLiterals.EMODELELEMENT_EANNOTATIONS, /*EAnnotation*/ null , msgs);
			}
			if (value != null){
				msgs = value.eInverseAdd(this, EcorePackageLiterals.EMODELELEMENT_EANNOTATIONS, /*EAnnotation*/ null, msgs);
			}
			msgs = this.basicSetEModelElement(value, msgs);
			if (msgs != null) {
				msgs.dispatch();
			}
		}
		else if (this.eNotificationRequired()){
			this.eNotify(new ENotificationImpl(this, NotificationImpl.SET,EcorePackageLiterals.EANNOTATION_EMODELELEMENT , value, value));
		}
	}

	
	public getEAnnotation(source:string): EAnnotation {
		/*TODO implement function*/ 
		return null;
	};

	protected eStaticClass():EClass{
		//return EcorePackageLiterals.EANNOTATION;
		return null;
	}

	public eInverseAdd(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain): NotificationChain{
		switch (featureID) {
			case EcorePackageLiterals.EANNOTATION_EMODELELEMENT:
				if (this.eInternalContainer() != null) {
					msgs = this.eBasicRemoveFromContainer(msgs);
				}
				return this.basicSetEModelElement(otherEnd as EModelElement, msgs);
		}
		//return this.eInverseAddFromEModelElement(otherEnd, featureID, msgs);
		return super.eInverseAdd(otherEnd, featureID, msgs);
	}
	//public eInverseAddFromEAnnotation = this.eInverseAdd;
	
	public eInverseRemove(otherEnd:InternalEObject, featureID:number, msgs:NotificationChain):NotificationChain{
		switch (featureID) {
			case EcorePackageLiterals.EANNOTATION_EMODELELEMENT:
				return this.basicSetEModelElement(null, msgs);
		}
		//return this.eInverseRemoveFromEModelElement(otherEnd, featureID, msgs);
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}
	
	//public eInverseRemoveFromEAnnotation = this.eInverseRemove;

	public basicSetEModelElement(newobj:EModelElement, msgs:NotificationChain):NotificationChain {
			msgs = this.eBasicSetContainer(newobj, EcorePackageLiterals.EANNOTATION_EMODELELEMENT, msgs);
			return msgs;
	}
	

	public eGet(featureID:number, resolve:boolean, coreType:boolean):any{
		switch (featureID) {
			case EcorePackageLiterals.EANNOTATION_EANNOTATIONS:
				return this.eAnnotations;
			case EcorePackageLiterals.EANNOTATION_SOURCE:
				return this.source;
			case EcorePackageLiterals.EANNOTATION_DETAILS:
				return this.details;
			case EcorePackageLiterals.EANNOTATION_EMODELELEMENT:
				return this.eModelElement;
			case EcorePackageLiterals.EANNOTATION_CONTENTS:
				return this.contents;
			case EcorePackageLiterals.EANNOTATION_REFERENCES:
				return this.references;
		}
		//return this.eGetFromEModelElement(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromEAnnotation = this.eGet;
}


