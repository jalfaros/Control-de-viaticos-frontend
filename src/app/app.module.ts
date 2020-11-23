import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './shared/login/login.component';
import { ViaticoComponent } from './components/viatico/viatico.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerViaticoComponent } from './components/ver-viatico/ver-viatico.component';
import { ToastrModule } from 'ngx-toastr';
import { ListaViaticoComponent } from './components/lista-viatico/lista-viatico.component';
import { ListarViaticosComponent } from './components/listar-viaticos/listar-viaticos.component';
import { AgregarViaticoComponent } from './components/agregar-viatico/agregar-viatico.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { EditarSucursalComponent } from './components/sucursal/editar-sucursal/editar-sucursal.component';
import { CrearSucursalComponent } from './components/sucursal/crear-sucursal/crear-sucursal.component';
import { CentroCostoComponent } from './components/centro-costo/centro-costo.component';
import { EditCentroCostoComponent } from './components/centro-costo/edit-centro-costo/edit-centro-costo.component';
import { CrearCentroCostoComponent } from './components/centro-costo/crear-centro-costo/crear-centro-costo.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { EditProveedorComponent } from './components/proveedor/edit-proveedor/edit-proveedor.component';
import { RecursoComponent } from './components/recurso/recurso.component';
import { EditRecursoComponent } from './components/recurso/edit-recurso/edit-recurso.component';
import { CrearRecursoComponent } from './components/recurso/crear-recurso/crear-recurso.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { EditClienteComponent } from './components/cliente/edit-cliente/edit-cliente.component';
import { MotivoComponent } from './components/motivo/motivo.component';
import { CrearMotivoComponent } from './components/motivo/crear-motivo/crear-motivo.component';
import { EditMotivoComponent } from './components/motivo/edit-motivo/edit-motivo.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ViaticoComponent,
    VerViaticoComponent,
    ListaViaticoComponent,
    ListarViaticosComponent,
    AgregarViaticoComponent,
    SucursalComponent,
    EditarSucursalComponent,
    CrearSucursalComponent,
    CentroCostoComponent,
    EditCentroCostoComponent,
    CrearCentroCostoComponent,
    ProveedorComponent,
    CrearProveedorComponent,
    EditProveedorComponent,
    RecursoComponent,
    EditRecursoComponent,
    CrearRecursoComponent,
    ClienteComponent,
    CrearClienteComponent,
    EditClienteComponent,
    MotivoComponent,
    CrearMotivoComponent,
    EditMotivoComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
