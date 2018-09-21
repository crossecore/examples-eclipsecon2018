/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

///<summary>This class was generated.</summary>

import {EFactory} from "./EFactory";
import {OrderedSet} from "./OrderedSet";
import {EPackage} from "./EPackage";
import {ENamedElement} from "./ENamedElement";
import {EClassifier} from "./EClassifier";

export interface EPackage
extends ENamedElement

{
	nsURI:string;
	nsPrefix:string;
	
	eFactoryInstance:EFactory;
	eClassifiers: OrderedSet<EClassifier>;
	eSubpackages: OrderedSet<EPackage>;
	eSuperPackage:EPackage;
	
	
	getEClassifier(name:string): EClassifier ;

}


