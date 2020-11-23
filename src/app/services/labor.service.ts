import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaborService {

  constructor( private http: HttpClient ) { }



  getLabor(){
    return this.http.get('http://localhost:3000/labor/getLabor')
      .pipe(map(response => response))
  }
}

