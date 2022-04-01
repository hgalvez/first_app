import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from '../api/utilities.service';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  products: any;

  constructor(public router: Router,
              private storage: Storage,
              public utility: UtilitiesService,
              public general_service: GeneralService,
  ){
  }

  ngOnInit(){
    this.storage.get("token").then((token)=>{
      this.general_service.list_products("products", token).subscribe(response =>{
        console.log("Esto es el servicio de productos");
        console.log(response);
        this.products = response;

      },(err) =>{
        console.log("Estoy en el errro");
        console.log(err);
      });
    });

    this.storage.get("json_response").then((json_response)=>{
      console.log("Esto es el json");
      console.log(json_response.success.token);
    });
  }

  product_detail(id){
    console.log(id);
  }

  close(){
    this.utility.back_button('prelogin');
  }
}
