/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>
import {EOperation} from "./EOperation";
import {EAttribute} from "./EAttribute";
import {OrderedSet} from "./OrderedSet";
import {EReference} from "./EReference";
import {EGenericType} from "./EGenericType";
import {EClassifier} from "./EClassifier";
import {EClass} from "./EClass";
import {EStructuralFeature} from "./EStructuralFeature";
export interface EClass
extends EClassifier

{
	abstract:boolean;
	interface:boolean;
	
	eSuperTypes: OrderedSet<EClass>;
	eOperations: OrderedSet<EOperation>;
	eAllAttributes: OrderedSet<EAttribute>;
	eAllReferences: OrderedSet<EReference>;
	eReferences: OrderedSet<EReference>;
	eAttributes: OrderedSet<EAttribute>;
	eAllContainments: OrderedSet<EReference>;
	eAllOperations: OrderedSet<EOperation>;
	eAllStructuralFeatures: OrderedSet<EStructuralFeature>;
	eAllSuperTypes: OrderedSet<EClass>;
	eIDAttribute:EAttribute;
	eStructuralFeatures: OrderedSet<EStructuralFeature>;
	eGenericSuperTypes: OrderedSet<EGenericType>;
	eAllGenericSuperTypes: OrderedSet<EGenericType>;
	
	
	isSuperTypeOf(someClass:EClass): boolean ;
	
	getOverride(operation:EOperation): EOperation ;
	
	getFeatureType(feature:EStructuralFeature): EGenericType ;
	
	getFeatureID(feature:EStructuralFeature): number ;
	
	getFeatureCount(): number ;
	
	getOperationID(operation:EOperation): number ;
	getEStructuralFeature(...args:Array<any>):any;
	
	getEStructuralFeature_number(featureID:number): EStructuralFeature ;
	getEStructuralFeature_string(featureName:string): EStructuralFeature ;
	
	getOperationCount(): number ;
	
	getEOperation(operationID:number): EOperation ;

}


