import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CentroCosto } from '../build/centro_costo';

@Injectable({
  providedIn: 'root'
})
export class CentroCostoService {

  URL = 'http://localhost:3000/costo/'

  constructor(private http: HttpClient) { }


  getCentroCosto( estado: number ) {

    return this.http.get(`${this.URL}centroCosto?isActive=${estado}`)
      .pipe(map((response: CentroCosto[]) => response))


  }

  editCentroCosto(params) {

    return this.http.put(`${this.URL}actualizarCentroCosto`, params, { observe: "response" })
      .pipe(map(response => response));

  }

  crearCcosto(params) {
    return this.http.post(`${this.URL}agregarCentroCosto`, params, { observe: "response" })
  }

}