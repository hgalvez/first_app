import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-prelogin',
  templateUrl: './prelogin.page.html',
  styleUrls: ['./prelogin.page.scss'],
})
export class PreloginPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log("Entro al boton del login");
    this.router.navigate(['login'], { replaceUrl: true });
  }

}
