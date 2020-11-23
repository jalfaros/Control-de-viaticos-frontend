import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { SucursalCliente } from 'src/app/build/sucursalCliente';
import {MatDialog} from '@angular/material/dialog';
import { EditarSucursalComponent } from './editar-sucursal/editar-sucursal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  parametrosRuta= '';

  sucursales: SucursalCliente[] = []

  constructor(private _sucursalService: SucursalService,
              public _dialog: MatDialog,
              private router: Router,
             ) {

   }

  ngOnInit(): void {
    this.getSucursales();
  }


  getSucursales(){
      this._sucursalService.getSucursalClientes()
        .subscribe((response: SucursalCliente[]) => {
          this.sucursales = response
        })
  }

  editSucursal(datos: SucursalCliente): void {
    const dialogRef = this._dialog.open(EditarSucursalComponent, {
      width: '30%',
      height: '50%',
      data: { ...datos }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result != undefined) {
        //this.openDialogConfirmationEdit(date, result); //llama al otro dialog
        console.log('Estoy sirviendo')
      }
    });
  }

  addSucursal(){
    this.router.navigate(['agregarSucursal']);
  }

}
