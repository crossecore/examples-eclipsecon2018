/* import Ecore*/
//namespace Conference{
	import {Conference} from "conference/Conference";
	import {ConferenceBase} from "conference/ConferenceBase";
	import {Set} from "ecore/Set";
	export class ConferenceImpl
	extends ConferenceBase
	{
	
		public static allInstances_:Set<Conference> = new Set<Conference>();
			
		public static allInstances():Set<Conference>{
			
			let result = new Set<Conference>();
			ConferenceImpl.allInstances_.forEach(x => result.push(x));
			
			
			return result;
		}
		
		
		//implement your generated class here
	}
//}
