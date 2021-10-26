import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key: string = `AIzaSyAkdG1ayXiDaoqHirWwaU50-44VV_R7QcA`;
  private realDatabase: string = 'https://tarjetadigitalda-default-rtdb.firebaseio.com';

  private apiAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.key;

  public userToken: any;

  constructor( private http: HttpClient ) { }

  Login(usuario: AuthModel) {

    const authData = {
      email: usuario.correo,
      password: usuario.contrasena,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.apiAuth}`,
      authData
    ).pipe(map(resp => {
      // console.log('Entro al mapa RXJS');
      this.guardarToken(resp);
      // this.esAdmin();
      return resp;
    })
    );
  }

  public guardarToken(idToken: any) {

    this.userToken = idToken['idToken'];
    let id = idToken['localId']

    sessionStorage.setItem('token', idToken['idToken']);
    sessionStorage.setItem('refresh_token', idToken['refreshToken']);
    sessionStorage.setItem('email', idToken['email']);
    sessionStorage.setItem('name', idToken['displayName']);
    sessionStorage.setItem('idUsuario', idToken['localId']);
  }


}
