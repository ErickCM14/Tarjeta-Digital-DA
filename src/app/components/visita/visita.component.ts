import { Component, OnInit } from '@angular/core';
import { VisitaModel } from 'src/app/models/visita.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  
  fecha: Date = new Date();
  contador: number = 1;
  id: string | null;
  token: string | null;
  dia: string | undefined;
  visitaModel: VisitaModel = new VisitaModel;

  constructor(private _auth: AuthService) {
    this.id = sessionStorage.getItem('idUsuario')
    this.token = sessionStorage.getItem('token')
  }

  ngOnInit(): void {
    this.dia = this.fecha.toLocaleDateString(undefined, { year: 'numeric' }) + '-' + this.fecha.toLocaleDateString(undefined, { month: '2-digit' }) + '-' + this.fecha.toLocaleDateString(undefined, { day: '2-digit' })
    console.log(this.dia);
    this.obtenerVisita(this.id, this.dia, this.contador)
  }

  guardarVisita(id: string | null, dia: string, contador: number){
    this.visitaModel.id = id;
    this.visitaModel.fecha = dia;
    this.visitaModel.contador = contador;
    this._auth.agregarVisita(this.visitaModel, this.token).subscribe(resp => {
      console.log(resp);
    }, error => {
      console.log(error);
      
    })
  }

  obtenerVisita(id: string | null, dia: string, contador: number){
      this._auth.obtenerVisita(id, this.token).subscribe((resp: any) => {

        let visitaModelAux:VisitaModel = new VisitaModel;
        if(!resp){
          console.log("es null");
          this.guardarVisita(id, dia, contador)
        }        

        visitaModelAux.contador = resp['contador'];
        visitaModelAux.fecha = resp['fecha'];
         
        if(this.dia != visitaModelAux.fecha){
          visitaModelAux.contador++;
          console.log("son distintas");
          this.guardarVisita(id, dia, visitaModelAux.contador)
        }
        console.log(resp);
        
      }, error => {
        console.log(error);
        
      })
  }

}
