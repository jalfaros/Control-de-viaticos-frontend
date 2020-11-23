import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViaticoComponent } from './components/viatico/viatico.component';
import { VerViaticoComponent } from './components/ver-viatico/ver-viatico.component';
import { ListaViaticoComponent } from './components/lista-viatico/lista-viatico.component';
import { ListarViaticosComponent } from './components/listar-viaticos/listar-viaticos.component';
import { AgregarViaticoComponent } from './components/agregar-viatico/agregar-viatico.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { CrearSucursalComponent } from './components/sucursal/crear-sucursal/crear-sucursal.component';
import { CentroCostoComponent } from './components/centro-costo/centro-costo.component';
import { CrearCentroCostoComponent } from './components/centro-costo/crear-centro-costo/crear-centro-costo.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { RecursoComponent } from './components/recurso/recurso.component';
import { CrearRecursoComponent } from './components/recurso/crear-recurso/crear-recurso.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { MotivoComponent } from './components/motivo/motivo.component';
import { CrearMotivoComponent } from './components/motivo/crear-motivo/crear-motivo.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  
  {path: 'main', component: MainComponent},
  {path: 'evento', component: ViaticoComponent},
  {path: 'verEvento', component: VerViaticoComponent},
  {path: 'listViatico/:idEvento', component: ListaViaticoComponent},
  {path: 'verViatico/:idEvento', component: ListarViaticosComponent},
  {path: 'agregarViatico/:idEvento', component: AgregarViaticoComponent},
  {path: 'sucursal', component: SucursalComponent},
  {path: 'agregarSucursal', component: CrearSucursalComponent},
  {path: 'centroCosto', component: CentroCostoComponent},
  {path: 'crearCentroCosto', component: CrearCentroCostoComponent},
  {path: 'proveedor', component: ProveedorComponent},
  {path: 'crearProveedor', component: CrearProveedorComponent},
  {path: 'recurso', component: RecursoComponent},
  {path: 'crearRecurso', component: CrearRecursoComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'crearCliente', component: CrearClienteComponent},
  {path: 'motivo', component: MotivoComponent},
  {path: 'crearMotivo', component: CrearMotivoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'main'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
