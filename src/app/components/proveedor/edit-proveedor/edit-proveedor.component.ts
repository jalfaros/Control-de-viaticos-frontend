import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProveedorComponent } from '../proveedor.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProovedorService } from '../../../services/proovedor.service';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.css']
})
export class EditProveedorComponent implements OnInit {

  forma: FormGroup;
  changeValue = true; //para saber si el checkbox tiene que estar activado o desactivado
  valueCheckboxLocal = true; //si el checkbox cambia de valor
  valueFinalCheckbox: boolean; //Valor final del checkbox

  constructor(public dialogRef: MatDialogRef<ProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _proveedorService: ProovedorService) {

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
  guardar(idProve: string) {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    this.actualizarDatos(idProve, this.forma.value.nombre)
  }

    //Funcion para hacer el update en el servicio
    actualizarDatos(idProve: string, descrip: string) {
      var estad = 0;
      if (this.valueFinalCheckbox) {
        estad = 1;
      }

      this._proveedorService.editProveedor({ idProveedor: idProve, descripcion: descrip, estado: estad })
      .subscribe(response => {
        if (response.body[0].success === true) {
          this.toastr.success('¡Se ha actualizado el Proveedor!', 'Exito')
          this.dialogRef.close();
          setTimeout(this.recargar, 2000)

          return;
        }
        this.toastr.error('¡Ha ocurrido un error al editar el Proveedor', 'Error')
      })
  }

    //Función para recargar la página
    recargar() {
      window.location.reload()
    }
  

}
