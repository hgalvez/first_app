import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  numero: any;

  constructor() {
    
  }

  push_button(){
    if(this.numero == undefined || this.numero == ""){
      console.log("Pon algo en el input");
    }else{
      console.log(this.numero);
    }
  }

}

// MVC = Modelo Vista Controlador