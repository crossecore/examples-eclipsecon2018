/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

import {EFactory} from "./EFactory";
import {EModelElement} from "./EModelElement";
import {EAttribute} from "./EAttribute";
import {EAnnotation} from "./EAnnotation";
import {EPackage} from "./EPackage";
import {EDataType} from "./EDataType";
import {ETypeParameter} from "./ETypeParameter";
import {EEnum} from "./EEnum";
import {EStringToStringMapEntry} from "./EStringToStringMapEntry";
import {EReference} from "./EReference";
import {EGenericType} from "./EGenericType";
import {EClassifier} from "./EClassifier";
import {EEnumLiteral} from "./EEnumLiteral";
import {ETypedElement} from "./ETypedElement";
import {EStructuralFeature} from "./EStructuralFeature";
import {EParameter} from "./EParameter";
import {EOperation} from "./EOperation";
import {EObject} from "./EObject";
import {ENamedElement} from "./ENamedElement";
import {EClass} from "./EClass";
export interface EcoreFactory extends EFactory{
	createEAttribute():EAttribute;
	createEAnnotation():EAnnotation;
	createEClass():EClass;
	createEClassifier():EClassifier;
	createEDataType():EDataType;
	createEEnum():EEnum;
	createEEnumLiteral():EEnumLiteral;
	createEFactory():EFactory;
	createEModelElement():EModelElement;
	createENamedElement():ENamedElement;
	createEObject():EObject;
	createEOperation():EOperation;
	createEPackage():EPackage;
	createEParameter():EParameter;
	createEReference():EReference;
	createEStructuralFeature():EStructuralFeature;
	createETypedElement():ETypedElement;
	createEStringToStringMapEntry():EStringToStringMapEntry;
	createEGenericType():EGenericType;
	createETypeParameter():ETypeParameter;
}

