import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Viatico } from '../build/viatico';
import { map } from 'rxjs/operators';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaticoService {

  URL_BASE = "http://localhost:3000/viatico/"

  constructor( private http: HttpClient ) { }


  crearViatico( params ){
    return this.http.post(`${this.URL_BASE}crearViatico`, params, {observe: "response"})
      .pipe(map(response => response));
  }

  obtenerViaticos(params){
    return this.http.get(`${this.URL_BASE}getViatico?idEvento=${params}`)
    .pipe(map((response: Viatico[])=> response))
  }

  obtenerTipoViaticos(){
    return this.http.get(`${this.URL_BASE}getTipoViatico`)
    .pipe(map(response => response))
  }

  obtenerVehiculos(){
    return this.http.get(`${this.URL_BASE}getAutos`)
    .pipe(map(response => response))
  }

  eliminarViatico( params ){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body:params 
    };
      
      return this.http.delete('http://localhost:3000/viatico/eliminarViatico', httpOptions)
        .pipe(map (res => res[0].success)
        )}
}