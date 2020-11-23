import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recurso } from 'src/app/build/recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { ViaticoService } from 'src/app/services/viatico.service';
import { ProovedorService } from 'src/app/services/proovedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-viatico',
  templateUrl: './agregar-viatico.component.html',
  styleUrls: ['./agregar-viatico.component.css']
})
export class AgregarViaticoComponent implements OnInit {

  idEvento: String
  forma : FormGroup
  recursos: Recurso[] = []
  tipoViatico = []
  proovedor = []
  vehiculos;
  estadoAutomovil = true;  
  montoKilometro: number; 
  monto: number;
  recorridos: number;
  recorridoK = true;
  placa: String
  

  constructor( private router: Router,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               private _recursoService: RecursoService,
               private _viaticoService : ViaticoService,
               private _proveedorService: ProovedorService,
               private toastr : ToastrService) 
               { 

                this.crearForm();
                
                }

  ngOnInit(): void {
    this.getRecursos();
    this.getTipoViatico();
    this.getProovedor();
    this.route.params.subscribe( params => this.idEvento = params['idEvento'] )
    
  }

  //Validaciones de los formularios de viaticos
  get facturaNoValida(){
    return this.forma.get('factura').invalid && this.forma.get('factura').touched
  }

  get montoNoValido(){
    return this.forma.get('monto').invalid && this.forma.get('monto').touched
  }

  get numPaxNoValido(){
    return this.forma.get('numPax').invalid && this.forma.get('numPax').touched
  }

  get tipoNoValido(){
    return this.forma.get('tipoViatico').invalid && this.forma.get('tipoViatico').touched
  }
  
  get autoNoValido(){
    return this.forma.get('automovil').invalid && this.forma.get('automovil').touched
  }

  get cedulaNoValido(){
    return this.forma.get('cedula').invalid && this.forma.get('cedula').touched
  }

  get provedorNoValido(){
    return this.forma.get('proveedor').invalid && this.forma.get('proveedor').touched
  }

//Validaciones a la hora de crear el viático
  crearForm(){
    this.forma = this.formBuilder.group({
      factura : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      monto : ['', [Validators.required]],
      numPax : ['', [Validators.required]],
      proveedor : ['', [Validators.required]],
      tipoViatico : ['', [Validators.required]],
      cedula : ['', [Validators.required]],
      automovil : ['', []],
      montoKilometro: [{value: '', disabled: true}, []],
      kilometroRecorrido: [{value: '', disabled: this.recorridoK}, []] 
    })
  }

  //Función para crear el viático
  crearViatico(){
    if (!this.submitForm()){
      console.log('invalido');
      return;
    }
    this._viaticoService.crearViatico({
      factura     : this.forma.value.factura,
      monto       : this.forma.value.monto,
      numPax      : this.forma.value.numPax,
      proveedor   : this.forma.value.proveedor,
      tipoViatico : this.forma.value.tipoViatico,
      cedula      : this.forma.value.cedula,
      idEvento    : this.idEvento,
      placa       : this.placa,
      kilometro   : this.recorridos

    }).subscribe(response =>{
      if (response.body[0].success === true){
        this.toastr.success('¡Viático creado correctamente!', 'Exito')
        this.router.navigate(['listViatico', this.idEvento])
      }else{
        this.toastr.error('¡Hubo un problema al crear el viático!', 'Error')
      }
    })

  }


  //Para obtener los recursos
  getRecursos(){
    this._recursoService.getRecurso( 1 ).subscribe((response: Recurso[]) => {
      this.recursos = response;
    });
  }

  //Para obtener el tipo de viatico
  getTipoViatico() {
    this._viaticoService.obtenerTipoViaticos().subscribe((response: []) => {
      this.tipoViatico = response;
    })
  }

  //Para obtener el proveedor
  getProovedor(){
    this._proveedorService.obtenerProoverdor( 1 ).subscribe((response: []) =>{
      this.proovedor = response;
    })
  }

  //Validaciones para hacer el submit
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

  //Para cambiar el estado de algunos select
  cambiarEstado( evento ){
    console.log(evento.value)
    if( evento.value === 'TP03' ){
      this._viaticoService.obtenerVehiculos().subscribe(response =>{
        this.vehiculos = response;
        this.estadoAutomovil = false;
        this.recorridoK = false;
      })
    }else{
      this.forma.value.automovil = undefined;
      (this.estadoAutomovil)
      ?
        null
      : 
        (this.estadoAutomovil= true,
        this.recorridoK = true)
    }
  }

  //Se obtiene el monto del auto y la placa
  montoAuto( evento ){
    this.placa = evento.value.placa;
    this.montoKilometro = evento.value.montoKilometro; 
  }

  //Se calcula el monto
  calcularMonto(){
    this.monto = this.recorridos * this.montoKilometro;
  }



}
