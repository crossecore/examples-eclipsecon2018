/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>
import {TreeIterator} from "./TreeIterator";
import {EReference} from "./EReference";
import {EStructuralFeature} from "./EStructuralFeature";
import {InternalEObject} from "./InternalEObject";
import {EOperation} from "./EOperation";
import {ENotificationImpl} from "./ENotificationImpl";
import {BasicEObjectImpl} from "./BasicEObjectImpl";
import {EObject} from "./EObject";
import {List} from "./List";
import {NotificationChain} from "./NotificationChain";
import {EcorePackageLiterals} from "./EcorePackageLiterals";
import {Resource} from "./Resource";
import {EClass} from "./EClass";
import {NotificationImpl} from "./NotificationImpl";
export class EObjectBase
extends BasicEObjectImpl
implements EObject

{

	
	public eIsSet(feature:EStructuralFeature): boolean {
		/*TODO implement function*/ 
		return null;
	};
	
	public eContainmentFeature(): EReference {
		/*TODO implement function*/ 
		return null;
	};
	
	public eIsProxy(): boolean {
		/*TODO implement function*/ 
		return null;
	};
	
	public eContainingFeature(): EStructuralFeature {
		/*TODO implement function*/ 
		return null;
	};
	
	public eClass(): EClass {
		/*TODO implement function*/ 
		return null;
	};
	
	public eContainer(): EObject {
		/*TODO implement function*/ 
		return null;
	};
	
	public eInvoke(operation:EOperation, arguments_:List<any>): any {
		/*TODO implement function*/ 
		return null;
	};
	
	public eSet(feature:EStructuralFeature, newValue:any): void {
		/*TODO implement function*/ 
		return null;
	};
	
	public eResource(): Resource {
		/*TODO implement function*/ 
		return null;
	};
	
	public eContents(): List<EObject> {
		/*TODO implement function*/ 
		return null;
	};
	
	public eCrossReferences(): List<EObject> {
		/*TODO implement function*/ 
		return null;
	};
	
	public eAllContents(): TreeIterator<EObject> {
		/*TODO implement function*/ 
		return null;
	};
	public eGet(...args:Array<any>):any {
		if(args.length === 1){
			
			return this.eGet_EStructuralFeature(args[0]);
		}
		if(args.length === 2){
			
			return this.eGet_EStructuralFeature_boolean(args[0], args[1]);
		}
        if(args.length === 3){

            return this.eGet_X(args[0], args[1], args[2]);
        }
	};
	
	public eGet_EStructuralFeature(feature:EStructuralFeature): any {
		/*TODO implement function*/ 
		return null;
	};
	public eGet_EStructuralFeature_boolean(feature:EStructuralFeature, resolve:boolean): any {
		/*TODO implement function*/ 
		return null;
	};
	
	public eUnset(feature:EStructuralFeature): void {
		/*TODO implement function*/ 
		return null;
	};

	protected eStaticClass():EClass{
		//return EcorePackageLiterals.EOBJECT;
		return null;
	}



	public eGet_X(featureID:number, resolve:boolean, coreType:boolean):any{
		//return this.eGetFromBasicEObjectImpl(featureID, resolve, coreType);
		return super.eGet(featureID, resolve, coreType);
	}
	//public eGetFromEObject = this.eGet;
}


