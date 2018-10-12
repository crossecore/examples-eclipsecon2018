/* import Ecore*/
//namespace Conference{
	import {Organization} from "conference/Organization";
	import {OrganizationBase} from "conference/OrganizationBase";
	import {Set} from "ecore/Set";
	export class OrganizationImpl
	extends OrganizationBase
	{
	
		public static allInstances_:Set<Organization> = new Set<Organization>();
			
		public static allInstances():Set<Organization>{
			
			let result = new Set<Organization>();
			OrganizationImpl.allInstances_.forEach(x => result.push(x));
			
			
			return result;
		}
		
		
		//implement your generated class here
	}
//}
