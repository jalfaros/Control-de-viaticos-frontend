import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  forma : FormGroup;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _clienteService: ClienteService,
  ) {
    this.crearForm();
   }

  ngOnInit(): void {
  }

  get nombreNoValido(){

    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }


  
  crearForm(){
    this.forma = this.formBuilder.group({
      nombre : ['', [Validators.required, Validators.minLength(4)]]

    })
  }

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

regresar(){
  this.router.navigate(['cliente']);
}

crearCliente(){
  if (!this.submitForm()){
    console.log('invalido');
    return;
  }
  this._clienteService.crearCliente({
    descripcion: this.forma.value.nombre,
  }).subscribe(response =>{
    if (response.body[0].success === true){
      this.toastr.success('¡Cliente creado correctamente!', 'Exito')
      this.router.navigate(['cliente'])
    }else{
      this.toastr.error('¡Hubo un problema al crear el cliente!', 'Error')
    }
  })

}
}
