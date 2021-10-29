import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  getClientes: any[] = [];
  constructor( private AuthService:AuthService) { }

  ngOnInit(): void {
    this.AuthService.getCliente().subscribe(resp => {
      this.getClientes = resp;
      console.log(this.getClientes);
    })
  }

}
