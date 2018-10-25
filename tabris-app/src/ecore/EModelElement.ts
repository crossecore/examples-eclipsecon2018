/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>
import {InternalEObject} from "../ecore/InternalEObject";
import {EAnnotation} from "../ecore/EAnnotation";
import {OrderedSet} from "../ecore/OrderedSet";
export interface EModelElement
extends InternalEObject

{
	
	eAnnotations: OrderedSet<EAnnotation>;
	
	
	getEAnnotation(source:string): EAnnotation ;

}


