/* import Ecore*/
//namespace Conference{
	import {Venue} from "../conference/Venue";
	import {VenueBase} from "../conference/VenueBase";
	import {Set} from "../ecore/Set";
	export class VenueImpl
	extends VenueBase
	{
	
		public static allInstances_:Set<Venue> = new Set<Venue>();
			
		public static allInstances():Set<Venue>{
			
			let result = new Set<Venue>();
			VenueImpl.allInstances_.forEach(x => result.push(x));
			
			
			return result;
		}
		
		
		//implement your generated class here
	}
//}
