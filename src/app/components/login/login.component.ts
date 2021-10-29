import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private _auth: AuthService, private fb: FormBuilder, private router: Router) {
    
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
      // console.log(resp);
      Swal.fire({
        title: "Credenciales correctas",
        text: 'Bienvenido a Dos Arroyos',
        icon: "success"
      })
    }, err => {
      const error = err.error.error.message;
      switch (error) {
        case 'EMAIL_NOT_FOUND':
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: 'El usuario no existe'
          });
          break;

        case 'INVALID_PASSWORD':
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: 'Contraseña incorrecta'
          });
          break;

        case 'USER_DISABLED':
          Swal.fire({
            icon: 'error',
            title: 'Usuario inhabilitado',
            text: 'La cuenta ha sido deshabilitada'
          });
          break;

        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        Swal.fire({
          icon: 'warning',
          title: 'Cuenta dehabilitada temporalmente',
          text: 'Realizo demasiados intentos fallidos de inicio de sesión, restablezca su contraseña o intentenlo nuevamente más tarde'
        });
        break;

        default:
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: error
          });
          break;
      }
    

    }, () => {
      if(this.loginModel.correo.includes('teamdeveloperss')){
        this.router.navigateByUrl('/clientes');
      }else{
        this.router.navigateByUrl('/visita');
      }
    })
    

  }

}
