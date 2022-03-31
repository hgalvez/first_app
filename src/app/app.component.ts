import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router) {

  }

  ngOnInit(){
    console.log("Justo en entrar");
    this.router.navigate(['prelogin'], { replaceUrl: true });
  }

}
