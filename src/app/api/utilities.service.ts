import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(public router: Router,
              private storage: Storage
    ) { }

  back_button(page){
    this.storage.set('token', "");
    this.router.navigate([page], { replaceUrl: true });
    // Borrame toda la informacion del usuario
    // Cambiame los colores
    // Otros
  }

  expired_token(){
    // LOGIN 
    //BORRAR EL LOGIN
    
  }
  
}
