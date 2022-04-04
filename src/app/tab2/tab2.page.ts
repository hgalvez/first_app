import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from '../api/utilities.service'
// import { Toast } from '@awesome-cordova-plugins/toast/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  numero: any;

  constructor(public router: Router, public utility: UtilitiesService) {
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

  close(){
    this.utility.back_button('prelogin');
  }

}

// MVC = Modelo Vista Controlador