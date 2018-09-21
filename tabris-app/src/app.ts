import {ui, Button, TextView, TextInput} from 'tabris';


import {EcorePackageImpl} from "./ecore";

let eclass = EcorePackageImpl.eINSTANCE.getEClass();


var i = 0;
for(let eattribute of eclass.eAllAttributes) {
  // TODO assert ecore package
  //if(eattribute.eType.getClassifierID() === EcorePackageImpl.ESTRING || true) { // FIXME
  if(true) {
    let input = new TextInput({
        top: 'prev() 20',
        left: '20%',
        right: '20%',
        message: eattribute.name
    }).appendTo(ui.contentView);

  }
  i++;
}
