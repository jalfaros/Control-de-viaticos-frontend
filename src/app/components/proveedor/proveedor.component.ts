import { Component, OnInit } from '@angular/core';
import { ProovedorService } from '../../services/proovedor.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProveedorComponent } from './edit-proveedor/edit-proveedor.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  provedores: [] = []

  constructor( private _proveedorService: ProovedorService,
               private router: Router,
               public _dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getProvedores();
  }


  getProvedores(){
    this._proveedorService.obtenerProoverdor(0).subscribe((response: []) => {
      this.provedores = response
    });
  }

  editProvedor(datos) {

    
    const dialogRef = this._dialog.open(EditProveedorComponent, {
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

  addProvedor(){

    this.router.navigate(['crearProveedor']);

  }
}
