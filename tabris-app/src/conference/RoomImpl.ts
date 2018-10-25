/* import Ecore*/
//namespace Conference{
	import {Room} from "../conference/Room";
	import {RoomBase} from "../conference/RoomBase";
	import {Set} from "../ecore/Set";
	export class RoomImpl
	extends RoomBase
	{
	
		public static allInstances_:Set<Room> = new Set<Room>();
			
		public static allInstances():Set<Room>{
			
			let result = new Set<Room>();
			RoomImpl.allInstances_.forEach(x => result.push(x));
			
			
			return result;
		}
		
		
		//implement your generated class here
	}
//}
