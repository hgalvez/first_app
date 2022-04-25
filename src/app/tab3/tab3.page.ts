import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UtilitiesService } from '../api/utilities.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  mensaje: any;
  clickedImage: string;

  constructor(public alertController: AlertController,
              public utility: UtilitiesService,
              public router: Router,
              public scanner: BarcodeScanner,
              private sanitizer: DomSanitizer,
              public camera: Camera,
              public geolocation: Geolocation,
              public toastController: ToastController
    ) {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("las coordenadas");
      console.log(resp);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }

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

  onChange($event){
    console.log($event.target.value);
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

  async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }

  bar_code(){
    this.router.navigate(['scaner']);
  }


  ionViewWillEnter(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  camara(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.clickedImage = base64Image;
      }, (err) => {
       // Handle error
      });
  }
}
