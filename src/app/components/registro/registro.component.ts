import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ClientesModel } from '../../models/clientes.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  cliente: ClientesModel = new ClientesModel();
  dirLogin:string = "/login";
  getClientes: string[] = [];
  llamado: any [] = [];

  constructor( private AuthService: AuthService) { }

  ngOnInit(): void {
    this.AuthService.getCliente()
    .subscribe( resp => {
      console.log(resp);
      this.getClientes = resp.map(user => user.email);
      console.log(this.getClientes);
    });
  }
  
  guardar(form: NgForm){
    console.log(form);
    console.log(this.cliente);
    if (form.invalid) { return }

    Swal.fire({
      title: 'Espere',
      text: 'Registrando información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    
    
    peticion = this.AuthService.AddCliente(this.cliente);
    
   
    this.getClientes.forEach( element => {if(element == this.cliente.email){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que este correo ya esta registrado'
      })
    }else{
      peticion.subscribe(resp => {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Gracias por registrarte',
          icon: 'success'
        }).then (function(){
          window.location.href = "/login"
        });
      });
    }
  });

  }
}
