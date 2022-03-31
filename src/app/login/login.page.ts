import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GeneralService } from '../api/general.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any;
  password: any;
  loading: any;

  constructor(public alertController: AlertController,
              public router: Router,
              public general_service: GeneralService,
              public loadingController: LoadingController
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

      let user_info = {
                          "login": this.user,
                          "password": this.password
                      }

      this.presentLoading("Espera porfavor");

      this.general_service.login(user_info).subscribe(response =>{
        const { role, data } = this.loading.dismiss();
        this.router.navigate(['tabs'], { replaceUrl: true });
      },(err) =>{
        const { role, data } = this.loading.dismiss();
        this.basic_alert("¡Alerta!","Los accesos son incorrectos");
      });
    }

    console.log("IMprimir");
  }

  validate(){
    // codigo
    // return True o un False
  }

  async presentLoading(msj) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msj,
      duration: 6000
    });
    await this.loading.present();
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
