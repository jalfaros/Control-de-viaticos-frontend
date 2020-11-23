import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { SucursalService } from '../../../services/sucursal.service';

@Component({
  selector: 'app-crear-sucursal',
  templateUrl: './crear-sucursal.component.html',
  styleUrls: ['./crear-sucursal.component.css']
})
export class CrearSucursalComponent implements OnInit {

  forma: FormGroup;
  clientes = []
  


  constructor(
    private formBuilder: FormBuilder,
    private _sucursalService: SucursalService,
    private router: Router,
    private toastr: ToastrService,
    private _clienteService : ClienteService
  ) {
    this.crearForm();
  }

  ngOnInit(): void {
    this.getCliente();
  }


  get nombreNoValido() {

    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get clienteNoValido() {

    return this.forma.get('cliente').invalid && this.forma.get('cliente').touched
  }


  crearForm() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      cliente: ['', [Validators.required]],

    })
  }

  submitForm() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls)
        .forEach(iterator => {

          if (iterator instanceof FormGroup) {

            Object.values(iterator.controls).forEach(campo => {
              campo.markAllAsTouched();
            })

          } else {
            iterator.markAllAsTouched();
          }

        });

      return;
    }

    return true;

  }


  regresar() {
    this.router.navigate(['sucursal']);
  }

  crearSucursal() {
    if (!this.submitForm()) {
      console.log('invalido');
      return;
    }
    this._sucursalService.crearSucursal({
      idCliente: this.forma.value.cliente,
      descripcion: this.forma.value.nombre,
      
    }).subscribe(response => {
      if (response.body[0].success === true) {
        this.toastr.success('¡Sucursal creada correctamente!', 'Exito')
        this.router.navigate(['sucursal'])
        return;
      } else { 
        this.toastr.error('¡Hubo un problema al crear la sucursal!', 'Error')
      }
    })

  }


  getCliente(){
    this._clienteService.getClientes(1)
      .subscribe((response: any[]) => {
        this.clientes = response;
      })
  }

}
