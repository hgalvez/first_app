import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UtilitiesService } from '../api/utilities.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  mensaje: any;
  clickedImage: string;
  map: any;
  address:string;
  lat: string;
  long: string;  
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;

  constructor(public alertController: AlertController,
              public utility: UtilitiesService,
              public router: Router,
              private nativeGeocoder: NativeGeocoder,
              public scanner: BarcodeScanner,
              public camera: Camera,
              public geolocation: Geolocation,
              public toastController: ToastController
    ) {

      // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];

      this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("las coordenadas");
      console.log(resp);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      this.loadMap();
    }

  //CARGAR EL MAPA TIENE DOS PARTES 
  loadMap() {
    
    //OBTENEMOS LAS COORDENADAS DESDE EL TELEFONO.
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      //Creacion del marcador
      var marker = new google.maps.Marker({
        position: latLng,
        title: "Hello World!",
      });

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 
      
      //CUANDO TENEMOS LAS COORDENADAS SIMPLEMENTE NECESITAMOS PASAR AL MAPA DE GOOGLE TODOS LOS PARAMETROS.
      // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude); 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 
      marker.setMap(this.map);
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map, this.map.center.lat());
        // this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())s
        this.lat = this.map.center.lat()
        this.long = this.map.center.lng()
      }); 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  second_point(){
    let latLng = new google.maps.LatLng("29.025508", "-110.9665465");

    //Creacion del marcador
    var marker = new google.maps.Marker({
      position: latLng,
    });
    
    //CUANDO TENEMOS LAS COORDENADAS SIMPLEMENTE NECESITAMOS PASAR AL MAPA DE GOOGLE TODOS LOS PARAMETROS.
    this.map = new google.maps.Map(this.mapElement.nativeElement); 
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5    
    }; 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value); 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
        console.log(this.address);
        console.log("Aca arriba la direccione");
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
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
