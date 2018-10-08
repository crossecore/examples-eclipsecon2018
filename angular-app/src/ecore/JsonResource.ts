import {EObject} from "./EObject";
import {OrderedSet} from "./OrderedSet";
import {EAttribute} from "./EAttribute";
import {EReference} from "./EReference";
import {Collection} from "./Collection";


export class JsonResource{


    private getId = (eObject:EObject):string => {

        var result:string = "";
        var eclass = eObject.eClass();
        var idFeature:EAttribute = null;

        for(let attribute of eclass.eAllAttributes){

            if(attribute.iD){
                idFeature = attribute;
                return eObject.eGet(idFeature);

            }
        }

        if(idFeature===null){

            //TODO generate uuid / hash value; use id attribute if present
            //generate uuid
        }

        return result;

    }

    private validEAllReferences = (eobject:EObject, features:OrderedSet<EReference>) : OrderedSet<EReference> => {

        var result = new OrderedSet<EReference>();

        for(let feature of features){


            if(!feature.transient){

                if(eobject.eGet(feature) != null){

                    if(feature.many && !(eobject.eGet(feature) as OrderedSet<any>).isEmpty()){
                        result.add(feature);
                    }
                    else if(!feature.many){
                        result.add(feature);
                    }
                }
            }
        }


        return result;
    }


    private validEAllAttributes = (eobject:EObject, features:OrderedSet<EAttribute>) : OrderedSet<EAttribute> => {

        var result = new OrderedSet<EAttribute>();

        for(let feature of features){


            if(!feature.transient){

                if(eobject.eGet(feature) != null){

                    if(feature.many && !(eobject.eGet(feature) as OrderedSet<any>).isEmpty()){
                        result.add(feature);
                    }
                    else if(!feature.many){
                        result.add(feature);
                    }
                }
            }
        }


        return result;
    }

    public asJson = (eobject:EObject)=> {

        var result:any = {};

        var eClass = eobject.eClass();

        var attributes = this.validEAllAttributes(eobject, eClass.eAllAttributes);
        var ereferences = this.validEAllReferences(eobject, eClass.eAllReferences);

        //TODO this is specific for the persistence technology (e.g. CouchDB)
        result["_id"] = this.getId(eobject);

        result["_type"] = eClass.ePackage.nsURI + ':' + eClass.name; //TODO

        for(let feature of attributes){

            result[feature.name] = eobject.eGet(feature);
            //TODO many
        }
        for(let feature of ereferences){

            if(feature.many){

              /*
                var items:Array<any> = eobject.eGet(feature) as Collection<any>;

                var itemIds = new Array<string>();
                for(var item of items){

                    itemIds.push(this.getId(item));
                }
                */

            }
            else{
                result[feature.name] = this.getId(eobject.eGet(feature));
            }
        }

        return result;



    }
}
