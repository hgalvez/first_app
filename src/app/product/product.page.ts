import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  var_del_id: any;
  product_id: any;
  product_name: any;
  constructor(public activatedRouter: ActivatedRoute,
              private storage: Storage,
              public general_service: GeneralService
              ) {}

  ngOnInit() {
    console.log("estoy en el detalle del producto");
    this.activatedRouter.params.subscribe(response =>{
      console.log(response.product_id);
      this.storage.get("token").then((token)=>{
        this.general_service.product_detail("products/", token, response.product_id).subscribe(response =>{
          console.log(response);
          console.log(response.label);
          this.product_name = response.label;
          this.product_id = response.id;
        },(err) =>{
          console.log("Estoy en el errro");
          console.log(err);
        });
      });
    });

  }

}
