import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Motivo } from '../build/motivo';

@Injectable({
  providedIn: 'root'
})
export class MotivoService {

  constructor( private http: HttpClient ) { }

  URL ='http://localhost:3000/motivo/'

  getMotivo( estado: number ) {
    return this.http.get(`${this.URL}getMotivo?isActive=${estado}`)
      .pipe(map((response: Motivo[]) => response))
  }


  editMotivo(params){

    return this.http.put(`${this.URL}actualizarMotivo`, params, {observe: "response"})
    .pipe(map(response => response));

  }

  crearMotivo(params){
    return  this.http.post(`${this.URL}agregarMotivo`, params, {observe: "response"} )
  }
}
