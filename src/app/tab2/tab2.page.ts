import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from '../api/utilities.service'
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
// import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GeneralService } from '../api/general.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  numero: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  lecture_code: any;
  lecture_id: any;
  clickedImage: any;

  latitude = undefined;
  longitude = undefined;

  constructor(public router: Router, 
              private barcodeScanner: BarcodeScanner,
              private device: Device,
              private storage: Storage,
              public general_service: GeneralService,
              public camera: Camera,
              public utility: UtilitiesService) {

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: false,
      resultDisplayDuration: 0
    };
    // si todo esta bien
    // let json ={
    //   "success": true,
    //   "msj": "Todo bien con los datos"
    // }

    // let json ={
    //   "success": false,
    //   "msj": "El correo no tiene el formato correcto"
    // }
    console.log('Device UUID is: ' + this.device.uuid);
    console.log('Device UUID is: ' + this.device.model);
    console.log('Device UUID is: ' + this.device.platform);
    console.log('Device UUID is: ' + this.device.serial);
  }

  getLocation() {
  }

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

  lecture(){
    this.barcodeScanner.scan().then(text => {
            console.log('Scanned something', text.text);
      console.log(text);
      this.lecture_code = text.text;
      this.storage.get("token").then((token)=>{
        this.general_service.product_detail("products/", token, text.text).subscribe(response =>{
          this.lecture_code = response.label;
          this.lecture_id = response.id;
          console.log(response);
        },(err) =>{
          console.log("Estoy en el errro");
          console.log(err);
          alert("Producto no encontrado");
        });
      });
     }).catch(err => {
      alert(err);
     });
  }

  camara(){
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    if(this.device.platform == "android"){
      const options: CameraOptions = {
        quality: 20,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: true
      }
    }else{
      const options: CameraOptions = {
        quality: 10,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: false
      }
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

// MVC = Modelo Vista Controlador