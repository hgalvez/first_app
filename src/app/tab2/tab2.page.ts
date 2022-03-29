import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  numero: any;

  constructor() {
    // si todo esta bien
    // let json ={
    //   "success": true,
    //   "msj": "Todo bien con los datos"
    // }

    // let json ={
    //   "success": false,
    //   "msj": "El correo no tiene el formato correcto"
    // }
  }

  // alert(json){
  //   if(json.success == true){
  //     presentalert(json.msj);
  //   }else{
  //     presentalert(json.msj)
  //   }
  // }

  push_button(){
    if(this.numero == undefined || this.numero == ""){
      console.log("Pon algo en el input");
    }else{
      console.log(this.numero);
    }
  }

}

// MVC = Modelo Vista Controlador