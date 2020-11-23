import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor( private http: HttpClient ) { }

  //Me obtiene todas las sucursales
  getSucursales(){
    return this.http.get('http://localhost:3000/sucursal/getSucursal')
    .pipe(map(response => response))
  }

  //Me obtiene las sucursales con la descripción del cliente
  getSucursalClientes(){
    return this.http.get('http://localhost:3000/sucursal/getSucursalClientes')
    .pipe(map(response => response))
  }

  editSucursal( params ){
    return this.http.put('http://localhost:3000/sucursal/actualizarSucursal', params, {observe: "response"})
      .pipe(map(response => response));
  }

  crearSucursal( params ){

      return  this.http.post('http://localhost:3000/sucursal/agregarSucursal', params, {observe: "response"} )
    
  }

  getSucursalActivo(){
    return this.http.get(`http://localhost:3000/sucursal/getRecursoActivo`)
      .pipe(map((response: any[]) => response ))
  }
}
