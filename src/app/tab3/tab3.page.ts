import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UtilitiesService } from '../api/utilities.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  mensaje: any;

  constructor(public alertController: AlertController,
              public utility: UtilitiesService
    ) {}

  alert_btn(from){
    if(from == "boton1"){
      this.basic_alert("Vengo del boton1","Esto es el mensaje del boton1");
    }else{
      this.basic_alert("Vengo del boton2","Esto es el mensaje del boton2");
    }
  }

  close(){
    this.utility.back_button('prelogin');
  }

  async basic_alert(variable,variable2) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: variable,
      message: variable2,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
