/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>
import {InternalEObject} from "./InternalEObject";
import {OrderedSet} from "./OrderedSet";
import {ETypeParameter} from "./ETypeParameter";
import {EGenericType} from "./EGenericType";
import {EClassifier} from "./EClassifier";
export interface EGenericType
extends InternalEObject

{
	
	eUpperBound:EGenericType;
	eTypeArguments: OrderedSet<EGenericType>;
	eRawType:EClassifier;
	eLowerBound:EGenericType;
	eTypeParameter:ETypeParameter;
	eClassifier:EClassifier;
	
	
	isInstance(object:any): boolean ;

}


