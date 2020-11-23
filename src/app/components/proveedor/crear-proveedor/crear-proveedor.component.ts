import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProovedorService } from '../../../services/proovedor.service';


@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit {


  forma : FormGroup;
  proveedores: [] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _proveedorService: ProovedorService,
  ) {
    this.crearForm();
   }

  ngOnInit(): void {

    this.getProveedores();
  }

  //Valido que se escriba en el formulario
  get nombreNoValido(){

    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }


  //Validadores para el formulario
  crearForm(){
    this.forma = this.formBuilder.group({
      nombre : ['', [Validators.required, Validators.minLength(4)]]

    })
  }

  //Para validar a la hora de hacer summit
  submitForm(){
    if ( this.forma.invalid ){
      Object.values( this.forma.controls )
      .forEach( iterator => {

        if ( iterator instanceof FormGroup ){

          Object.values( iterator.controls ).forEach( campo =>{
            campo.markAllAsTouched();
          })

        } else{
          iterator.markAllAsTouched();
        }

      });
     
      return;
    }

    return true;
    
  }

  //Se obtienen los proveedores del servicio
  getProveedores(){
    this._proveedorService.obtenerProoverdor(0)
      .subscribe((response: []) => {
        this.proveedores = response
      })
}

//Para volver
regresar(){
  this.router.navigate(['proveedor']);
}

//Funcio del btn crear para crear el proveedor
crearProveedor(){
  if (!this.submitForm()){
    console.log('invalido');
    return;
  }
  this._proveedorService.crearProveedor({
    descripcion: this.forma.value.nombre,
  }).subscribe(response =>{
    if (response.body[0].success === true){
      this.toastr.success('¡Proveedor creado correctamente!', 'Exito')
      this.router.navigate(['proveedor'])
    }else{
      this.toastr.error('¡Hubo un problema al crear el proveedor!', 'Error')
    }
  })

}

}
