import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../../services/recurso.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditRecursoComponent } from './edit-recurso/edit-recurso.component';
import { Recurso } from '../../build/recurso';
@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent implements OnInit {


  recursos: Recurso[] = []

  constructor( private _recursoService: RecursoService,
               private router: Router,
               public _dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getRecursos();
  }


  getRecursos(){
    this._recursoService.getRecurso(0).subscribe((response: []) => {
      this.recursos = response
    });
  }

  editRecurso(datos: Recurso) {

    
    const dialogRef = this._dialog.open(EditRecursoComponent, {
      width: '30%',
      height: '65%',
      data: { ...datos }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result != undefined) {
        //this.openDialogConfirmationEdit(date, result); //llama al otro dialog
        console.log('Estoy sirviendo')
      }
    });
  
    
  }

  addRecurso(){

    this.router.navigate(['crearRecurso']);

  }

}
