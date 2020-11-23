import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ViaticoService } from '../../services/viatico.service';
import { Viatico } from '../../build/viatico';
import { Router } from '@angular/router';
import { ListarViaticosComponent } from '../listar-viaticos/listar-viaticos.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-viatico',
  templateUrl: './lista-viatico.component.html',
  styleUrls: ['./lista-viatico.component.css']
})
export class ListaViaticoComponent implements OnInit {
 
  listViaticos: Viatico[];
  ruta;
  constructor(
              public _viaticoService: ViaticoService,
              private _activatedRoute: ActivatedRoute,
              public router: Router,
              public _dialog: MatDialog) {}

  ngOnInit(): void {
    //Recibo un dato por parámetro
    this._activatedRoute.params.subscribe( params => this.ruta = params['idEvento'] );

    //Obtengo los viáticos de esa ruta
    this._viaticoService.obtenerViaticos( this.ruta )
    .subscribe(response => {
      if (response[0].idViatico){
        this.listViaticos = response;
      }
    })
  }
  
  //Me repara la fecha para la imprecioón
  repararFecha(convercion: Date){

    let fecha = '';
    fecha= (convercion).toString();
    let Nuevafecha= fecha.split('T')

    return Nuevafecha[0];
  }

  //Llama al dialog dónde voy a ver el viático
  seeViatico(date: Viatico): void {
    const dialogRef = this._dialog.open(ListarViaticosComponent, {
      width: '30%',
      height: '70%',
      data: { ...date }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  //Ruta para agregar un viatico
  agregarViatico(){
    this.router.navigate(['agregarViatico', this.ruta]);

  }

}
