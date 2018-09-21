/* CrossEcore is a cross-platform modeling framework that generates C#, TypeScript,
 * JavaScript, Swift code from Ecore models with embedded OCL (http://www.crossecore.org/).
 * The original Eclipse Modeling Framework is available at https://www.eclipse.org/modeling/emf/.
 *
 * contributor: Simon Schwichtenberg
 */

import {EClassBase} from "./EClassBase";
import {OrderedSet} from "./OrderedSet";
import {EAttribute} from "./EAttribute";
import {EAttributeBase} from "./EAttributeBase";
import {EReferenceBase} from "./EReferenceBase";
import {EReference} from "./EReference";
import {EClass} from "./EClass";

///<summary>This class was generated.</summary>

	export class EClassImpl
	extends EClassBase
	
	{
		get eAttributes():OrderedSet<EAttribute>{

			//TODO use ocl select/collect

			var result:OrderedSet<EAttribute> = new OrderedSet<EAttribute>();

			this.eStructuralFeatures.forEach(f=>{

				if(f instanceof EAttributeBase){
					result.add(f);
				}
			});

			return result;
		}

		get eReferences():OrderedSet<EReference>{

			//TODO use ocl select/collect

			var result:OrderedSet<EReference> = new OrderedSet<EReference>();

			this.eStructuralFeatures.forEach(f=>{

				if(f instanceof EReferenceBase){
					result.add(f);
				}
			});

			return result;
		}


		get eAllSuperTypes():OrderedSet<EClass>{

			var result = new OrderedSet<EClass>();
			var queue = new Array<EClass>();

			this.eSuperTypes.forEach((parent)=>{
				queue.push(parent);
				result.add(parent);
			});

			while(queue.length>0){

				var next = queue.shift();

				next.eSuperTypes.forEach((parent)=>{
					queue.push(parent);
					result.add(parent);
				});
			}


			return result;
		}

		get eAllAttributes():OrderedSet<EAttribute>{

			var result = new OrderedSet<EAttribute>();
			this.eAttributes.forEach((a)=>{
				result.add(a);
			});

			this.eAllSuperTypes.forEach((t)=>{

				t.eAttributes.forEach((a)=>{
					result.add(a);
				})
			});

			return result;
		}
	}
	

