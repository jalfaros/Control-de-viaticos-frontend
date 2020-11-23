import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CentroCostoService } from 'src/app/services/centro-costo.service';
import { CentroCosto } from 'src/app/build/centro_costo';
import { MotivoService } from 'src/app/services/motivo.service';
import { Motivo } from 'src/app/build/motivo';
import { Recurso } from 'src/app/build/recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/build/sucursal';
import { Labor } from 'src/app/build/labor';
import { LaborService } from 'src/app/services/labor.service';
import { EventoService } from 'src/app/services/evento.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viatico',
  templateUrl: './viatico.component.html',
  styleUrls: ['./viatico.component.css']
})
export class ViaticoComponent implements OnInit {

  forma: FormGroup
  fechaEvento

  centroCosto: CentroCosto[] = []
  motivo: Motivo[] = []
  recurso: Recurso[] = []
  sucursales: Sucursal[] = []
  labor: Labor[] = []
  toggle = true

  constructor( private _formBuilder: FormBuilder,
               private _costoService: CentroCostoService,
               private _motivoService: MotivoService,
               private _recursoService: RecursoService,
               private _sucursalService: SucursalService,
               private _laborService: LaborService,
               private _eventoService: EventoService,
               private toastr: ToastrService,
               private router: Router ) {  

    this.crearForm();  


  }

  ngOnInit(): void {
    this.getCentros()
    this.getMotivo()
    this.getRecurso()
    this.getSucursal()
    this.getLabor() 
    
  }

  get pReportadoNoValido(){
    return this.forma.get('pReportado').invalid && this.forma.get('pReportado').touched
  }

  get tRealizadoNoValido(){
    return this.forma.get('tRealizado').invalid && this.forma.get('tRealizado').touched
  }

  get horaNoValido(){
    return this.forma.get('horas').invalid && this.forma.get('horas').touched
  }

  get minutoNoValido(){
    return this.forma.get('minutos').invalid && this.forma.get('minutos').touched
  }
  get fechaNoValido(){
    return this.forma.get('fecha').invalid && this.forma.get('fecha').touched
  }

  get cCostoNoValido(){
    return this.forma.get('cCosto').invalid && this.forma.get('cCosto').touched
  }

  get motivoNoValido(){
    return this.forma.get('motivo').invalid && this.forma.get('motivo').touched
  }

  get laborNoValido(){
    return this.forma.get('labor').invalid && this.forma.get('labor').touched
  }

  get sucursalNoValido(){
    return this.forma.get('sucursal').invalid && this.forma.get('sucursal').touched
  }

  get cedulaNoValido(){
    return this.forma.get('cedula').invalid && this.forma.get('cedula').touched
  }

  crearForm(){

    this.forma = this._formBuilder.group({
      pReportado: ['', [Validators.required, Validators.minLength(10)]],
      tRealizado: ['', [Validators.required, Validators.minLength(10)]],
      horas: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      cCosto: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      labor: ['', [Validators.required]],
      sucursal: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      resuelto: ['', [Validators.required]],
      minutos: ['', [Validators.required]],
    });
  }



  crearEvento(   ){
    if (!this.submitForm()){
      return;
    }
    this._eventoService.crearEvento({
      pReportado : this.forma.value.pReportado,
      tRealizado : this.forma.value.tRealizado,
      fecha : this.convertirFecha(),
      horas: this.forma.value.horas,
      minutos: this.forma.value.minutos,
      pResuelto: 'NE',
      motivo: this.forma.value.motivo,
      cCosto: this.forma.value.cCosto,
      labor: this.forma.value.labor,
      sucursal: this.forma.value.sucursal,
      cedula: this.forma.value.cedula
    }).subscribe(response => {
        if( response.body[0].success === true ){
          this.toastr.success('¡Se ha guardado el evento exitosamente!','Exito')
          this.router.navigateByUrl('verEvento')
        }else{
          this.toastr.error('¡Ha ocurrido un error guardando el evento!', 'Error')
        }
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

  getCentros( ){
    this._costoService.getCentroCosto( 1 )
      .subscribe(response => {
        this.centroCosto = response;
      })
  }

  getMotivo(){
    this._motivoService.getMotivo(1)
        .subscribe((response: Motivo []) => {
          this.motivo = response
      })
  }

  getRecurso(){
    this._recursoService.getRecurso(1)
      .subscribe((response: Recurso[]) => {
        this.recurso = response
      })
  }

  getSucursal(){
    this._sucursalService.getSucursalActivo()
      .subscribe((response: Sucursal[]) => {
        this.sucursales = response
      })
  }


  getLabor(){
    this._laborService.getLabor()
      .subscribe((response: Labor[]) =>{
        this.labor = response;
      })
  }

  convertirFecha() {
     if (!this.fechaEvento){
       return;
     }
     var date = new Date(this.fechaEvento),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      return ([date.getFullYear(), mnth, day].join("-"));
  }

  volver(){

    this.router.navigateByUrl('verEvento')
  }
  

  limpiar(){
    this.forma.reset()
  }


 

}
