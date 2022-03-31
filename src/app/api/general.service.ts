import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  constructor(private http: HttpClient) { }

  login(object): Observable<any>{
    return this.http.post("https://live.sysbiterp.com/api/index.php/login", object).pipe(
      retry(2)
    );
  }

}
