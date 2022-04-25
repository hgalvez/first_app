import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  public clickedImage: string;
  constructor(public camera: Camera,private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.openCamara();
  }

  openCamara() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //  let img = this.camera.DestinationType.FILE_URI
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(imageData);
     this.clickedImage = imageData;
     //this.clickedImage = this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
     //this.user_image = this.sanitizer.bypassSecurityTrustResourceUrl(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
    }, (err) => {
     // Handle error
    });
  }

}
