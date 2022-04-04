import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators'
import { ConfigManager } from '../config'

@Injectable({
  providedIn: 'root'
})

// Agregar Headers
// let httpOptions ={
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'DOLAPIKEY': token,
//     'Autorization': "Bearer: Token",
//     'UserAgent': "token"
//   })
// }

export class GeneralService {
  base_url: any;

  constructor(private http: HttpClient) { 
    this.base_url = ConfigManager.base_url;

  }

  login(object, endpoint): Observable<any>{
    return this.http.post(this.base_url + endpoint, object).pipe(
      retry(2)
    );
  }
  
  list_products(endpoint, token): Observable<any>{
    let httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'DOLAPIKEY': token
      })
    }
    return this.http.get(this.base_url + endpoint, httpOptions).pipe(
      retry(2)
    );
  }

  product_detail(endpoint, token, id): Observable<any>{
    let httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'DOLAPIKEY': token
      })
    }
    return this.http.get(this.base_url + endpoint + id, httpOptions).pipe(
      retry(2)
    );
  }



  //Este servicio es para el detalle del producto
  // https://live.sysbiterp.com/api/index.php/products/143


}
