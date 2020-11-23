import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: [] = []
  constructor(private _clienteService: ClienteService,
              private router: Router,
              public _dialog: MatDialog) { 
                this.getClientes();
              }

  ngOnInit(): void {
  }

  getClientes(){
    this._clienteService.getClientes(0).subscribe((response: []) =>
    {this.clientes = response
    });
  }


addCliente(){

  this.router.navigate(['crearCliente']);

}

editCliente(datos: any){

  const dialogRef = this._dialog.open(EditClienteComponent, {
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
