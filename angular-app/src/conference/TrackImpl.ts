/* import Ecore*/
//namespace Conference{
	import {Track} from "conference/Track";
	import {TrackBase} from "conference/TrackBase";
	import {Set} from "ecore/Set";
	export class TrackImpl
	extends TrackBase
	{
	
		public static allInstances_:Set<Track> = new Set<Track>();
			
		public static allInstances():Set<Track>{
			
			let result = new Set<Track>();
			TrackImpl.allInstances_.forEach(x => result.push(x));
			
			
			return result;
		}
		
		
		//implement your generated class here
	}
//}
