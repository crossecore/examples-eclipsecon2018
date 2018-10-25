/* import Ecore*/
//namespace Conference{
	import {Talk} from "../conference/Talk";
	import {TalkBase} from "../conference/TalkBase";
	import {Set} from "../ecore/Set";
	export class TalkImpl
	extends TalkBase
	{
	
		public static allInstances_:Set<Talk> = new Set<Talk>();
			
		public static allInstances():Set<Talk>{
			
			let result = new Set<Talk>();
			TalkImpl.allInstances_.forEach(x => result.push(x));
			
			
			return result;
		}
		
		
		//implement your generated class here
	}
//}
