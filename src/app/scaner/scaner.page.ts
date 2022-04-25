import { Component, OnInit } from '@angular/core';
// import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.page.html',
  styleUrls: ['./scaner.page.scss'],
})
export class ScanerPage implements OnInit {
  encodedData: any;
  scannedBarCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private barcodeScanner: BarcodeScanner) { 
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: false,
      resultDisplayDuration: 0
    };
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.scanBRcode();
  }

  scanBRcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }



}
