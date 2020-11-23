import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClienteComponent } from '../cliente.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentroCosto } from 'src/app/build/centro_costo';
import { CentroCostoService } from '../../../services/centro-costo.service';
import { ClienteService } from '../../../services/cliente.service';
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {


  forma: FormGroup;
  changeValue = true; //para saber si el checkbox tiene que estar activado o desactivado
  valueCheckboxLocal = true; //si el checkbox cambia de valor
  valueFinalCheckbox: boolean; //Valor final del checkbox

  constructor(public dialogRef: MatDialogRef<ClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _clienteService: ClienteService) {

    this.crearFormulario();
  }

//Bnt de cancelar
  onNoClick(): void {
    this.dialogRef.close();
  }

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

  //Para validar cuando se toca el formulario
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  //Para tomar los eventos de checkbox
  checkValue(event: any) {
    if (this.changeValue != this.valueCheckboxLocal) { //Falso
      this.valueFinalCheckbox = event;
    } else {//Verdadero
      this.valueFinalCheckbox = event;
    }
  }

  //Para crear el formulario
  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', Validators.minLength(5)],
    })

  }

  //Para btn de guardar
  guardar(idCliente: string) {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    this.actualizarDatos(idCliente, this.forma.value.nombre)
  }

  //Funcion para hacer el update en el servicio
  actualizarDatos(idCliente: string, descrip: string) {
    var estad = 0;
    if (this.valueFinalCheckbox) {
      estad = 1;
    }

    this._clienteService.editCliente({ idCliente: idCliente, descripcion: descrip, estado: estad })
      .subscribe(response => {
        if (response.body[0].success === true) {
          this.toastr.success('¡Se ha actualizado el Cliente!', 'Exito')
          this.dialogRef.close();
          setTimeout(this.recargar, 2000)

          return;
        }
        this.toastr.error('¡Ha ocurrido un error al editar el Cliente', 'Error')

      })

  }


  //Función para recargar la página
  recargar() {
    window.location.reload()
  }



}
