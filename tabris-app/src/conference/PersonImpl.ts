/* import Ecore*/
//namespace Conference{
	import {Person} from "../conference/Person";
	import {PersonBase} from "../conference/PersonBase";
	import {Set} from "../ecore/Set";
	export class PersonImpl
	extends PersonBase
	{
	
		public static allInstances_:Set<Person> = new Set<Person>();
			
		public static allInstances():Set<Person>{
			
			let result = new Set<Person>();
			PersonImpl.allInstances_.forEach(x => result.push(x));
			
			
			return result;
		}
		
		
		//implement your generated class here
	}
//}
