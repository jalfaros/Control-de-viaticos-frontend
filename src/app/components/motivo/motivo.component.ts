import { Component, OnInit } from '@angular/core';
import { MotivoService } from '../../services/motivo.service';
import { Motivo } from 'src/app/build/motivo';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditMotivoComponent } from './edit-motivo/edit-motivo.component';

@Component({
  selector: 'app-motivo',
  templateUrl: './motivo.component.html',
  styleUrls: ['./motivo.component.css']
})
export class MotivoComponent implements OnInit {

  motivos: Motivo[]= []

  constructor(private _motivoService: MotivoService,
    public _dialog: MatDialog,
    private router: Router,) {

      this.getMotivos();
   }

  ngOnInit(): void {
  }

  //Obtiene la lista de motivos
  getMotivos(){
    this._motivoService.getMotivo(0).subscribe((response: Motivo[]) =>
    {this.motivos = response
    });
  }


  //Se dirige a la ventana de crear motivo
  addMotivo(){
    this.router.navigate(['crearMotivo']);
  }

  //Llama al dialog de edit motivo
  editMotivo(datos: Motivo): void {

    const dialogRef = this._dialog.open(EditMotivoComponent, {
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
