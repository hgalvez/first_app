import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(public router: Router) { }

  back_button(page){
    this.router.navigate([page], { replaceUrl: true });
    // Borrame toda la informacion del usuario
    // Cambiame los colores
    // Otros
  }
  
}
