import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  loginModel: AuthModel = new AuthModel;

  cargando: boolean = true

  constructor(private _auth: AuthService, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.inicializar()
  }

  inicializar() {
    this.loginForm = this.fb.group({
      correo: [, [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]],
      contrasena: [, [Validators.required, Validators.minLength(6)]]
    });
    this.cargando = false;
  }

  getErrores(campo: string) {
    return this.loginForm?.controls[campo].errors && this.loginForm?.controls[campo].touched;
  }


  login() {

    if (this.loginForm?.invalid) {
      this.loginForm?.markAllAsTouched()
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Validando credenciales, espere por favor...'
    });
    Swal.showLoading();

    this.loginModel = this.loginForm?.value;

    this._auth.Login(this.loginModel).subscribe(resp => {
      console.log(resp);
      Swal.fire({
        title: "Credenciales correctas",
        text: 'Bienvenido a Dos Arroyos',
        icon: "success"
      })
    }, error => {
      console.log(error);
    })
    

  }

}
