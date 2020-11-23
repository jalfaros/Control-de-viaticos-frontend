import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from '../../build/Evento';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-viatico',
  templateUrl:'./ver-viatico.component.html',
  styleUrls: ['./ver-viatico.component.css']
})
export class VerViaticoComponent implements OnInit {

  listEventos: Evento[] =  [];


  constructor( public _eventoService: EventoService,
               private toastr: ToastrService,
               private router: Router ) { }

  ngOnInit(): void {
    
    this.getEventos();
    
  }

  // Eliminar evento

  deleteEvento( eventoId, index ){
    Swal.fire({
      title: '¿Está seguro que desea borrar este evento?',
      text: "Esto eliminará los viáticos asociados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText : 'Cancelar'
      
    }).then((result) => {
      if (result.value) {
        this._eventoService.eliminarEvento({ idEvento: eventoId })
        .subscribe(response => {
          if( response ){  

            this.listEventos.splice(index, 1)
            if(this.listEventos.length == 0 ){
              this.listEventos = undefined;
            }

            this.toastr.success('¡Se ha eliminado el evento!','Exito')
            return;
            

      }
        this.toastr.error('¡Ha ocurrido un error al eliminar el evento')
      
    });
      }

    })

  }
  //Obtener eventos
  getEventos(){
    this._eventoService.obtenerEventos()
    .subscribe(response => {
     
        this.listEventos = response;
      
    })
  }

  
  //Repara formato de fecha
  repararFecha(convercion: Date){

    let fecha = '';
    fecha= (convercion).toString();
    let Nuevafecha= fecha.split('T')

    return Nuevafecha[0];
  }

  //Me llama la ventana para crear eventos
  crearEvento(){
    this.router.navigateByUrl('evento')
  }


  //Me muestra la lista de viaticos
  listarViaticos( idEvento ){
    this.router.navigate(['/listViatico', idEvento]);
  }

}
