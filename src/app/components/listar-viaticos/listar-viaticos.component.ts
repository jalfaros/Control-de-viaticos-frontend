import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Viatico } from 'src/app/build/viatico';
import { ViaticoService } from '../../services/viatico.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-viaticos',
  templateUrl: './listar-viaticos.component.html',
  styleUrls: ['./listar-viaticos.component.css']
})
export class ListarViaticosComponent implements OnInit {

  
  constructor(

    private toastr: ToastrService,
    public _viaticoService: ViaticoService,
    public dialogRef: MatDialogRef<ListarViaticosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Viatico) { }

  ngOnInit(): void {
  }

  //Función para cerrar el viático
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Función para recargar la página
  recargar(){
    window.location.reload()
  }

  //Funcion para eliminar el viático
  deleteViatico( viaticoId){
    Swal.fire({
      title: '¿Está seguro que desea borrar el viatico',
      text: `Se eliminara el viatico: ${viaticoId}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText : 'Cancelar'
      
    }).then((result) => {
      if (result.value) {
        this._viaticoService.eliminarViatico({ idViatico: viaticoId })
        .subscribe(response => {
          if( response ){  

            //this.listEventos.splice(index, 1)
            this.toastr.success('¡Se ha eliminado el viatico!','Exito')
            this.dialogRef.close();

            setTimeout(this.recargar, 2000)
                     
            return;

      }
        this.toastr.error('¡Ha ocurrido un error al eliminar el viatico')
      
    });
      }

    })

  }

}
