/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>
import {EModelElement} from "./EModelElement";
import {OrderedSet} from "./OrderedSet";
import {EObject} from "./EObject";
import {EPackage} from "./EPackage";
import {EDataType} from "./EDataType";
import {EClass} from "./EClass";
export interface EFactory
extends EModelElement

{
	
	ePackage:EPackage;
	
	
	createFromString(eDataType:EDataType, literalValue:string): any ;
	
	create(eClass:EClass): EObject ;
	
	convertToString(eDataType:EDataType, instanceValue:any): string ;

}


