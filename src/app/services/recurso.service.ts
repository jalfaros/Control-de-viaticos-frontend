import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recurso } from '../build/recurso';
@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor( private http: HttpClient ) { }

  URL_DB = 'http://localhost:3000/recurso/'


  getRecurso( estado: number  ){ 
    return this.http.get(`${this.URL_DB}getRecurso?isActive=${estado}`).
    pipe(map((response: Recurso[]) => response))
   }

   editRecurso( params ){
    return this.http.put(`${this.URL_DB}actualizarRecurso`, params, {observe: "response"})
      .pipe(map(response => response));
  }
  crearRecurso(params){
    return  this.http.post(`${this.URL_DB}agregarRecurso`, params, {observe: "response"} )
  }


  
}
