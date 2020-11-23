import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CentroCosto } from 'src/app/build/centro_costo';
import { CentroCostoService } from '../../../services/centro-costo.service';

@Component({
  selector: 'app-crear-centro-costo',
  templateUrl: './crear-centro-costo.component.html',
  styleUrls: ['./crear-centro-costo.component.css']
})
export class CrearCentroCostoComponent implements OnInit {

  forma : FormGroup;
  centrosCostos: CentroCosto[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _centroCostoService: CentroCostoService,
  ) {
    this.crearForm();
   }

  ngOnInit(): void {

    this.getCcostos();
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

  getCcostos(){
    this._centroCostoService.getCentroCosto(0)
      .subscribe((response: CentroCosto[]) => {
        this.centrosCostos = response
      })
}

regresar(){
  this.router.navigate(['centroCosto']);
}

crearCcosto(){
  if (!this.submitForm()){
    console.log('invalido');
    return;
  }
  this._centroCostoService.crearCcosto({
    descripcion: this.forma.value.nombre,
  }).subscribe(response =>{
    if (response.body[0].success === true){
      this.toastr.success('¡Centro costo creado correctamente!', 'Exito')
      this.router.navigate(['centroCosto'])
    }else{
      this.toastr.error('¡Hubo un problema al crear el centro de costo!', 'Error')
    }
  })

}


}
