import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

   API_URL = 'http://localhost:3000/cliente/'

  constructor( private http: HttpClient ) { }



  getClientes( estado: number ){
    return this.http.get(`${this.API_URL}getCliente?isActive=${estado}`)
      .pipe(map(response => response));
  }

  editCliente(params){

    return this.http.put(`${this.API_URL}actualizarCliente`, params, {observe: "response"})
    .pipe(map(response => response));

  }

  crearCliente(params){
    return  this.http.post(`${this.API_URL}agregarCliente`, params, {observe: "response"} )
  }
}
