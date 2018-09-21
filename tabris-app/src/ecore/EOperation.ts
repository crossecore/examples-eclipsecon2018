/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>
import {EParameter} from "./EParameter";
import {EOperation} from "./EOperation";
import {OrderedSet} from "./OrderedSet";
import {ETypeParameter} from "./ETypeParameter";
import {EGenericType} from "./EGenericType";
import {ETypedElement} from "./ETypedElement";
import {EClassifier} from "./EClassifier";
import {EClass} from "./EClass";
export interface EOperation
extends ETypedElement

{
	
	eContainingClass:EClass;
	eTypeParameters: OrderedSet<ETypeParameter>;
	eParameters: OrderedSet<EParameter>;
	eExceptions: OrderedSet<EClassifier>;
	eGenericExceptions: OrderedSet<EGenericType>;
	
	
	isOverrideOf(someOperation:EOperation): boolean ;
	
	getOperationID(): number ;

}


