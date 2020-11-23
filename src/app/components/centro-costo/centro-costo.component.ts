import { Component, OnInit } from '@angular/core';
import { CentroCosto } from '../../build/centro_costo';
import { CentroCostoService } from '../../services/centro-costo.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditCentroCostoComponent } from './edit-centro-costo/edit-centro-costo.component';

@Component({
  selector: 'app-centro-costo',
  templateUrl: './centro-costo.component.html',
  styleUrls: ['./centro-costo.component.css']
})
export class CentroCostoComponent implements OnInit {

  centrosCostos: CentroCosto[]= []

  constructor(private _centroCostoService: CentroCostoService,
    public _dialog: MatDialog,
    private router: Router,) {

      this.getSucursales();
   }

  ngOnInit(): void {
  }

  getSucursales(){
    this._centroCostoService.getCentroCosto( 0 ).subscribe((response: CentroCosto[]) =>
    {this.centrosCostos = response
    });
  }


  addCentroCosto(){

    this.router.navigate(['crearCentroCosto']);

  }


  editCentroCosto(datos: CentroCosto): void {

    const dialogRef = this._dialog.open(EditCentroCostoComponent, {
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

}
