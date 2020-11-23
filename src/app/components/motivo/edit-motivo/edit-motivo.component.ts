import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MotivoComponent } from '../motivo.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Motivo } from '../../../build/motivo';
import { ToastrService } from 'ngx-toastr';
import { MotivoService } from '../../../services/motivo.service';

@Component({
  selector: 'app-edit-motivo',
  templateUrl: './edit-motivo.component.html',
  styleUrls: ['./edit-motivo.component.css']
})
export class EditMotivoComponent implements OnInit {

 
  forma: FormGroup;
  changeValue = true; //para saber si el checkbox tiene que estar activado o desactivado
  valueCheckboxLocal = true; //si el checkbox cambia de valor
  valueFinalCheckbox: boolean; //Valor final del checkbox

  constructor(public dialogRef: MatDialogRef<MotivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Motivo,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _motivoService: MotivoService) {

    this.crearFormulario();
  }

  //Estoy inicializando checkbox
  ngOnInit(): void {
    console.log(this.data.Estado)
    if (this.data.Estado == true) {
      this.changeValue = true;
      this.valueFinalCheckbox = true;
      this.valueCheckboxLocal = true;
    } else {
      this.changeValue = false;
      this.valueCheckboxLocal = false;
    }
  }

  //Funcion para el btn de cancelar
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Para activar un danger si hay errores en el formulario
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  //Funcion para obtener cambios del checkbox
  checkValue(event: any) {
    if (this.changeValue != this.valueCheckboxLocal) { //Falso
      this.valueFinalCheckbox = event;
    } else {//Verdadero
      this.valueFinalCheckbox = event;
    }
  }

  //Funcion para validaciones de formularios
  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', Validators.minLength(5)],
    })

  }

  //Funcion para las validaciones y guardar luego de tocar el btn
  guardar(tipoMoti: string) {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    this.actualizarDatos(tipoMoti, this.forma.value.nombre)
  }

    //Funcion para hacer el update en el servicio
    actualizarDatos(tipoMoti: string, descrip: string) {
      var estad = 0;
      if (this.valueFinalCheckbox) {
        estad = 1;
      }

      this._motivoService.editMotivo({ tipoMotivo: tipoMoti, descripcion: descrip, estado: estad })
      .subscribe(response => {
        if (response.body[0].success === true) {
          this.toastr.success('¡Se ha actualizado el Motivo!', 'Exito')
          this.dialogRef.close();
          setTimeout(this.recargar, 2000)

          return;
        }
        this.toastr.error('¡Ha ocurrido un error al editar el Motivo', 'Error')
      })
  }

    //Función para recargar la página
    recargar() {
      window.location.reload()
    }
  


}
