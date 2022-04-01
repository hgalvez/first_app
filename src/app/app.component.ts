import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router,
              private storage: Storage) {
                
    this.storage.create();
  }

  ngOnInit(){
    console.log("Justo en entrar");
    this.storage.get("token").then((token)=>{
      if(token == ""){
        this.router.navigate(['prelogin'], { replaceUrl: true });
      }else{
        this.router.navigate(['tabs'], { replaceUrl: true });
      }
      console.log(token);
    });
  }

}
