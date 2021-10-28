import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitaModel } from 'src/app/models/visita.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
  cargando: boolean = true;

  visitaArray = [
    {
      imagenContador: "../../../assets/visitas/visita-1.png",
      imagenRangoContador: "../../../assets/visitas/visita-1-10.png",
      texto: "primera"
    },
    {
      imagenContador: "../../../assets/visitas/visita-2.png",
      imagenRangoContador: "../../../assets/visitas/visita-2-10.png",
      texto: "segunda"
    },
    {
      imagenContador: "../../../assets/visitas/visita-3.png",
      imagenRangoContador: "../../../assets/visitas/visita-3-10.png",
      texto: "tercera"
    },
    {
      imagenContador: "../../../assets/visitas/visita-4.png",
      imagenRangoContador: "../../../assets/visitas/visita-4-10.png",
      texto: "cuarta"
    },
    {
      imagenContador: "../../../assets/visitas/visita-5.png",
      imagenRangoContador: "../../../assets/visitas/visita-5-10.png",
      texto: "quinta"
    },
    {
      imagenContador: "../../../assets/visitas/visita-6.png",
      imagenRangoContador: "../../../assets/visitas/visita-6-10.png",
      texto: "sexta"
    },
    {
      imagenContador: "../../../assets/visitas/visita-7.png",
      imagenRangoContador: "../../../assets/visitas/visita-7-10.png",
      texto: "séptima"
    },
    {
      imagenContador: "../../../assets/visitas/visita-8.png",
      imagenRangoContador: "../../../assets/visitas/visita-8-10.png",
      texto: "octava"
    },
    {
      imagenContador: "../../../assets/visitas/visita-9.png",
      imagenRangoContador: "../../../assets/visitas/visita-9-10.png",
      texto: "novena"
    },
    {
      imagenContador: "../../../assets/visitas/visita-10.png",
      imagenRangoContador: "../../../assets/visitas/visita-10-10.png",
    }
  ]

  constructor(private _auth: AuthService, private router: Router) {
    this.id = sessionStorage.getItem('idUsuario')
    this.token = sessionStorage.getItem('token')
  }

  ngOnInit(): void {
    this.dia = this.fecha.toLocaleDateString(undefined, { year: 'numeric' }) + '-' + this.fecha.toLocaleDateString(undefined, { month: '2-digit' }) + '-' + this.fecha.toLocaleDateString(undefined, { day: '2-digit' })
    console.log(this.dia);
    this.obtenerVisita(this.id, this.dia, this.contador)
  }

  guardarVisita(id: string | null, dia: string, contador: number) {
    this.visitaModel.id = id;
    this.visitaModel.fecha = dia;
    this.visitaModel.contador = contador;
    this._auth.agregarVisita(this.visitaModel, this.token).subscribe(resp => {
      this.visitaModel = resp;
      this.cargando = false;
    }, error => {
      console.log(error);
      console.log("Mandar a iniciar sesión");
    })
  }

  obtenerVisita(id: string | null, dia: string, contador: number) {

    this._auth.obtenerVisita(id, this.token).subscribe((resp: any) => {

      if (!resp) {
        this.guardarVisita(id, dia, contador)
        return;
      }

      this.visitaModel = resp;

      if (this.visitaModel.contador == 10) {
        this.visitaModel.contador = 0;
      }

      if (this.dia != this.visitaModel.fecha) {
        this.visitaModel.contador++;
        console.log("son distintas");
        this.guardarVisita(id, dia, this.visitaModel.contador)
      } else {
        if (this.visitaModel.contador == 0) {
          this.visitaModel.contador = 10;
        }
        this.cargando = false;
      }

    }, error => {
      Swal.fire({
        title: "Sesión caducada",
        text: "Su sesión ha caducado, vuelva a iniciar sesión",
        icon: "info"
      })
      this.router.navigateByUrl('/login');
    })
  }

}
