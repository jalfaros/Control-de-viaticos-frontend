import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CentroCostoComponent } from '../centro-costo.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentroCosto } from 'src/app/build/centro_costo';
import { CentroCostoService } from '../../../services/centro-costo.service';

@Component({
  selector: 'app-edit-centro-costo',
  templateUrl: './edit-centro-costo.component.html',
  styleUrls: ['./edit-centro-costo.component.css']
})
export class EditCentroCostoComponent implements OnInit {

  forma: FormGroup;
  changeValue = true; //para saber si el checkbox tiene que estar activado o desactivado
  valueCheckboxLocal = true; //si el checkbox cambia de valor
  valueFinalCheckbox: boolean; //Valor final del checkbox

  constructor(public dialogRef: MatDialogRef<CentroCostoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CentroCosto,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _centroCostoService: CentroCostoService) {

    this.crearFormulario();
  }


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

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  checkValue(event: any) {
    if (this.changeValue != this.valueCheckboxLocal) { //Falso
      this.valueFinalCheckbox = event;
    } else {//Verdadero
      this.valueFinalCheckbox = event;
    }
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', Validators.minLength(5)],
    })

  }

  guardar(idCentroC: string) {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    this.actualizarDatos(idCentroC, this.forma.value.nombre)
  }

  //Funcion para hacer el update en el servicio
  actualizarDatos(idCentro: string, descrip: string) {
    var estad = 0;
    if (this.valueFinalCheckbox) {
      estad = 1;
    }

    this._centroCostoService.editCentroCosto({ idCentroCosto: idCentro, descripcion: descrip, estado: estad })
      .subscribe(response => {
        if (response.body[0].success === true) {
          this.toastr.success('¡Se ha actualizado el centro de costo!', 'Exito')
          this.dialogRef.close();
          setTimeout(this.recargar, 2000)

          return;
        }
        this.toastr.error('¡Ha ocurrido un error al editar el centro de costo', 'Error')

      })

  }


  //Función para recargar la página
  recargar() {
    window.location.reload()
  }



}
