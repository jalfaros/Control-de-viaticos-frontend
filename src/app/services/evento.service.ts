import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Evento } from '../build/Evento';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor( private http: HttpClient ) { }
  url = 'http://localhost:3000/evento/';

  crearEvento( params ){
    return  this.http.post(`${this.url}agregarEvento`, params, {observe: "response"} )
  }

  obtenerEventos(){
    return this.http.get(`${this.url}obtenerEvento`)
    .pipe(map((response: Evento[])=> response))
  }

  eliminarEvento( params ){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body:params 
    };
      
      return this.http.delete(`${this.url}eliminarEvento`, httpOptions)
        .pipe(map (res => res[0].success)
        )}
}
