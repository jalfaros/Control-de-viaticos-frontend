import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProovedorService {
  
  URL_BASE = "http://localhost:3000/proveedor/"

  constructor( private http: HttpClient ) { }


  obtenerProoverdor( estado: number ){
    return this.http.get(`${this.URL_BASE}getProovedor?isActive=${estado}`)
  }

  crearProveedor(params){
    return  this.http.post(`${this.URL_BASE}agregarProveedor`, params, {observe: "response"} )
  }

  editProveedor(params){

    return this.http.put(`${this.URL_BASE}actualizarProveedor`, params, {observe: "response"})
    .pipe(map(response => response));
  }


}
