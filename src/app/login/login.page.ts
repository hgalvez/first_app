import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any;
  password: any;

  constructor(public alertController: AlertController,
              public router: Router
              ) { 

  }

  ngOnInit() {
  }


  login(){
    console.log(this.user);
    console.log(this.password);
    if(this.user == "" || this.user == undefined || this.password == "" || this.password == undefined){
      this.basic_alert("¡Alerta!","Los accesos son incorrecto");
    }else{
      // La llamada al servidor
      // var login ={
      //   "user": "renan",
      //   "password": "renan"
      // }
      // Respuesta
      var response ={
        "success": false,
        "mensaje": "Login correcto"
      }

      if(response.success == true){
        this.router.navigate(['tabs'], { replaceUrl: true });
      }else{
        console.log("Esto es de la respuesta del server")
        this.basic_alert("¡Alerta!","Los accesos son incorrecto");
      }
    }
  }

  validate(){
    // codigo
    // return True o un False
  }

  async basic_alert(title,msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
