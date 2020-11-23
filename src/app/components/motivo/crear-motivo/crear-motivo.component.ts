import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MotivoService } from '../../../services/motivo.service';

@Component({
  selector: 'app-crear-motivo',
  templateUrl: './crear-motivo.component.html',
  styleUrls: ['./crear-motivo.component.css']
})
export class CrearMotivoComponent implements OnInit {


  forma : FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _motivoService: MotivoService,
  ) {
    this.crearForm();
   }

  ngOnInit(): void {

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

//Para volver
regresar(){
  this.router.navigate(['motivo']);
}

//Funcio del btn crear para crear el motivo
crearMotivo(){
  if (!this.submitForm()){
    console.log('invalido');
    return;
  }
  this._motivoService.crearMotivo({
    descripcion: this.forma.value.nombre
  }).subscribe(response =>{
    if (response.body[0].success === true){
      this.toastr.success('!Motivo creado correctamente!', 'Exito')
      this.router.navigate(['motivo'])
    }else{
      this.toastr.error('¡Hubo un problema al crear el Motivo!', 'Error')
    }
  })

}
}
