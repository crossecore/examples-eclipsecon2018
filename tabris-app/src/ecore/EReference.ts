/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>
import {EAttribute} from "./EAttribute";
import {OrderedSet} from "./OrderedSet";
import {EReference} from "./EReference";
import {EStructuralFeature} from "./EStructuralFeature";
import {EClass} from "./EClass";
export interface EReference
extends EStructuralFeature

{
	containment:boolean;
	container:boolean;
	resolveProxies:boolean;
	
	eOpposite:EReference;
	eReferenceType:EClass;
	eKeys: OrderedSet<EAttribute>;
	

}


