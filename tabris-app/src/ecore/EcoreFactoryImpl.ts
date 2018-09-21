/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */
import {EAnnotation} from "./EAnnotation";
import {ETypeParameterImpl} from "./ETypeParameterImpl";
import {EDataType} from "./EDataType";
import {EEnum} from "./EEnum";
import {EGenericTypeImpl} from "./EGenericTypeImpl";
import {EReference} from "./EReference";
import {EClassifier} from "./EClassifier";
import {ETypedElement} from "./ETypedElement";
import {EStructuralFeature} from "./EStructuralFeature";
import {EAnnotationImpl} from "./EAnnotationImpl";
import {ENamedElementImpl} from "./ENamedElementImpl";
import {EParameter} from "./EParameter";
import {EObject} from "./EObject";
import {EModelElementImpl} from "./EModelElementImpl";
import {EObjectImpl} from "./EObjectImpl";
import {ENamedElement} from "./ENamedElement";
import {EReferenceImpl} from "./EReferenceImpl";
import {EClassImpl} from "./EClassImpl";
import {EAttributeImpl} from "./EAttributeImpl";
import {EStructuralFeatureImpl} from "./EStructuralFeatureImpl";
import {EClass} from "./EClass";
import {EEnumImpl} from "./EEnumImpl";
import {EFactory} from "./EFactory";
import {EStringToStringMapEntryImpl} from "./EStringToStringMapEntryImpl";
import {EDataTypeImpl} from "./EDataTypeImpl";
import {EModelElement} from "./EModelElement";
import {EAttribute} from "./EAttribute";
import {EPackage} from "./EPackage";
import {ETypeParameter} from "./ETypeParameter";
import {EStringToStringMapEntry} from "./EStringToStringMapEntry";
import {EGenericType} from "./EGenericType";
import {EEnumLiteral} from "./EEnumLiteral";
import {EParameterImpl} from "./EParameterImpl";
import {ETypedElementImpl} from "./ETypedElementImpl";
import {EEnumLiteralImpl} from "./EEnumLiteralImpl";
import {EOperation} from "./EOperation";
import {EcoreFactory} from "./EcoreFactory";
import {EPackageImpl} from "./EPackageImpl";
import {EClassifierImpl} from "./EClassifierImpl";
import {EOperationImpl} from "./EOperationImpl";
import {EFactoryImpl} from "./EFactoryImpl";
export class EcoreFactoryImpl extends EFactoryImpl implements EcoreFactory{
	public static eINSTANCE : EcoreFactory = EcoreFactoryImpl.init();
	public static init() : EcoreFactory 
	{
		return new EcoreFactoryImpl();
	}
	
	public createEAttribute = () : EAttribute => {
		var theEAttribute = new EAttributeImpl();
		return theEAttribute;
	}
	public createEAnnotation = () : EAnnotation => {
		var theEAnnotation = new EAnnotationImpl();
		return theEAnnotation;
	}
	public createEClass = () : EClass => {
		var theEClass = new EClassImpl();
		return theEClass;
	}
	public createEClassifier = () : EClassifier => {
		var theEClassifier = new EClassifierImpl();
		return theEClassifier;
	}
	public createEDataType = () : EDataType => {
		var theEDataType = new EDataTypeImpl();
		return theEDataType;
	}
	public createEEnum = () : EEnum => {
		var theEEnum = new EEnumImpl();
		return theEEnum;
	}
	public createEEnumLiteral = () : EEnumLiteral => {
		var theEEnumLiteral = new EEnumLiteralImpl();
		return theEEnumLiteral;
	}
	public createEFactory = () : EFactory => {
		var theEFactory = new EFactoryImpl();
		return theEFactory;
	}
	public createEModelElement = () : EModelElement => {
		var theEModelElement = new EModelElementImpl();
		return theEModelElement;
	}
	public createENamedElement = () : ENamedElement => {
		var theENamedElement = new ENamedElementImpl();
		return theENamedElement;
	}
	public createEObject = () : EObject => {
		var theEObject = new EObjectImpl();
		return theEObject;
	}
	public createEOperation = () : EOperation => {
		var theEOperation = new EOperationImpl();
		return theEOperation;
	}
	public createEPackage = () : EPackage => {
		var theEPackage = new EPackageImpl();
		return theEPackage;
	}
	public createEParameter = () : EParameter => {
		var theEParameter = new EParameterImpl();
		return theEParameter;
	}
	public createEReference = () : EReference => {
		var theEReference = new EReferenceImpl();
		return theEReference;
	}
	public createEStructuralFeature = () : EStructuralFeature => {
		var theEStructuralFeature = new EStructuralFeatureImpl();
		return theEStructuralFeature;
	}
	public createETypedElement = () : ETypedElement => {
		var theETypedElement = new ETypedElementImpl();
		return theETypedElement;
	}
	public createEStringToStringMapEntry = () : EStringToStringMapEntry => {
		var theEStringToStringMapEntry = new EStringToStringMapEntryImpl();
		return theEStringToStringMapEntry;
	}
	public createEGenericType = () : EGenericType => {
		var theEGenericType = new EGenericTypeImpl();
		return theEGenericType;
	}
	public createETypeParameter = () : ETypeParameter => {
		var theETypeParameter = new ETypeParameterImpl();
		return theETypeParameter;
	}
}


