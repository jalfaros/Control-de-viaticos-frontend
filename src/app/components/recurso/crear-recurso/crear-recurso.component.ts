import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecursoService } from '../../../services/recurso.service';



@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent implements OnInit {


  forma : FormGroup;
  recursos: [] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _recursoService: RecursoService,
  ) {
    this.crearForm();
   }

  ngOnInit(): void {

  }

  //Valido que se escriba en el formulario
  get nombreNoValido(){

    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellido1NoValido(){

    return this.forma.get('apellido1').invalid && this.forma.get('apellido1').touched
  }

  get apellido2NoValido(){

    return this.forma.get('apellido2').invalid && this.forma.get('apellido2').touched
  }

  get cedulaNoValido(){

    return this.forma.get('cedula').invalid && this.forma.get('cedula').touched
  }


  //Validadores para el formulario
  crearForm(){
    this.forma = this.formBuilder.group({
      nombre : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      apellido1 : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      apellido2 : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      cedula : ['', [Validators.required, Validators.pattern(/^[1-9]-\d{4}-\d{4}$/)] ],

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


//Para volver
regresar(){
  this.router.navigate(['recurso']);
}

//Funcion del btn crear para crear el recurso
crearProveedor(){
  if (!this.submitForm()){
    console.log('invalido');
    return;
  }
  this._recursoService.crearRecurso({
    cedula: this.forma.value.cedula,
    nombre: this.forma.value.nombre,
    apellido1: this.forma.value.apellido1,
    apellido2: this.forma.value.apellido2
  }).subscribe(response =>{
    if (response.body[0].success === true){
      this.toastr.success('!Recurso creado correctamente!', 'Exito')
      this.router.navigate(['recurso'])
    }else{
      this.toastr.error('¡Hubo un problema al crear el recurso!', 'Error')
    }
  })

}
}
