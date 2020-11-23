import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecursoComponent } from '../recurso.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecursoService } from '../../../services/recurso.service';

@Component({
  selector: 'app-edit-recurso',
  templateUrl: './edit-recurso.component.html',
  styleUrls: ['./edit-recurso.component.css']
})
export class EditRecursoComponent implements OnInit {

  forma: FormGroup;
  changeValue = true; //para saber si el checkbox tiene que estar activado o desactivado
  valueCheckboxLocal = true; //si el checkbox cambia de valor
  valueFinalCheckbox: boolean; //Valor final del checkbox

  constructor(public dialogRef: MatDialogRef<RecursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _recursoService: RecursoService) {

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

  
  get apellido1NoValido() {
    return this.forma.get('apellido1').invalid && this.forma.get('apellido1').touched
  }

  get apellido2NoValido() {
    return this.forma.get('apellido2').invalid && this.forma.get('apellido2').touched
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
      apellido1: ['',Validators.minLength(5)],
      nombre: ['', Validators.minLength(5)],
      apellido2: ['',Validators.minLength(5)],
    })

  }

  //Funcion para las validaciones y guardar luego de tocar el btn
  guardar(cedu: string) {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    this.actualizarDatos(cedu, this.forma.value.nombre, this.forma.value.apellido1, this.forma.value.apellido2)
  }

    //Funcion para hacer el update en el servicio
    actualizarDatos(cedu: string, nombr: string, apelli1:string, apelli2:string) {
      var estad = 0;
      if (this.valueFinalCheckbox) {
        estad = 1;
      }

      this._recursoService.editRecurso({ cedula: cedu, nombre: nombr, apellido1: apelli1, apellido2: apelli2, estado: estad })
      .subscribe(response => {
        if (response.body[0].success === true) {
          this.toastr.success('¡Se ha actualizado el Recurso!', 'Exito')
          this.dialogRef.close();
          setTimeout(this.recargar, 2000)

          return;
        }
        this.toastr.error('¡Ha ocurrido un error al editar el Recurso', 'Error')
      })
  }

    //Función para recargar la página
    recargar() {
      window.location.reload()
    }
  
}
