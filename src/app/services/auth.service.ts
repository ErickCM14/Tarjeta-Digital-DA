import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthModel } from '../models/auth.model';
import { VisitaModel } from '../models/visita.model';
import { ClientesModel } from '../models/clientes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key: string = `AIzaSyAkdG1ayXiDaoqHirWwaU50-44VV_R7QcA`;
  private realDatabase: string = 'https://tarjetadigitalda-default-rtdb.firebaseio.com';
  private auth = '?auth=';
  private correoRestablecimiento = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=` + this.key;

  private apiAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.key;
  private apiSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ this.key;

  public userToken: any;

  constructor(private http: HttpClient) { }

  Login(usuario: AuthModel): Observable<any> {

    const authData = {
      email: usuario.correo,
      password: usuario.contrasena,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.apiAuth}`,
      authData)
      .pipe(map(resp => {
        this.guardarToken(resp);
        return resp;
      })
      );
  }

  public guardarToken(idToken: any) {

    this.userToken = idToken['idToken'];

    sessionStorage.setItem('token', idToken['idToken']);
    sessionStorage.setItem('refresh_token', idToken['refreshToken']);
    sessionStorage.setItem('email', idToken['email']);
    sessionStorage.setItem('name', idToken['displayName']);
    sessionStorage.setItem('idUsuario', idToken['localId']);
  }

  correoRestablecimientoContrasena(correo: string) {
    const body = {
      "requestType": "PASSWORD_RESET",
      "email": correo
    }
    return this.http.post(this.correoRestablecimiento, body);
  }

  agregarVisita(visitaObjeto: any, token: string | null): Observable<any> {

    let visita = {
      visita:{
        contador: visitaObjeto.contador,
        fecha: visitaObjeto.fecha
      }
    };

    return this.http.patch(
      `${this.realDatabase}/clientes/${visitaObjeto.id}.json` + this.auth + token, visita)
      .pipe(
      map((resp: any) => {
        return visita;
      })
    );
  };

  obtenerVisita(id: string | null, token: string | null): Observable<any> {
    return this.http.get(`${this.realDatabase}/visita/${id}.json` + this.auth + token);
  }

  // Metodos de registro
  newUser( cliente:ClientesModel){
    const authData = {
      ...cliente,
      returnSecureToken: true
    };

    return this.http.post( `${this.apiSignIn}`, authData);
  }
  AddCliente(cliente: ClientesModel) {
    return this.http.post(`${this.realDatabase}/clientes.json`, cliente)
      .pipe(
        map((resp: any) => {
          cliente.id = resp.name;
          return cliente;
        })
      )
  }

  getClienteId(id: string) {
    return this.http.get(`${this.realDatabase}/clientes/${id}.json`);
  }

  getCliente() {
    return this.http.get(`${this.realDatabase}/clientes.json`)
      .pipe(
        map(resp => this.arrCliente(resp))
      );
  }

  private arrCliente(clienteOBj: object) {
    const Clientes: ClientesModel[] = [];

    console.log(clienteOBj);
    if (clienteOBj === null) { return []; }

    Object.keys(clienteOBj).forEach(key => {
      const cliente: ClientesModel = clienteOBj[key];
      cliente.id = key;

      Clientes.push(cliente);
    });

    return Clientes;
  }


}
