import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthModel } from '../models/auth.model';
import { VisitaModel } from '../models/visita.model';
import { ClientesModel } from '../models/clientes.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key: string = `AIzaSyAkdG1ayXiDaoqHirWwaU50-44VV_R7QcA`;
  private realDatabase: string = 'https://tarjetadigitalda-default-rtdb.firebaseio.com';
  private auth = '?auth=';

  private apiAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.key;

  public userToken: any;

  constructor(private http: HttpClient) { }

  Login(usuario: AuthModel) {

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

  agregarVisita(visita: VisitaModel, token: string | null) {

    let visitaData = {
      contador: visita.contador,
      fecha: visita.fecha
    };

    return this.http.put(
      `${this.realDatabase}/visita/${visita.id}.json` + this.auth + token,
      visitaData
    ).pipe(
      map((resp: any) => {
        return visita;
      })
    );
  };/**Cierra el Registrar datos accesos**/

  obtenerVisita(id: string | null, token: string | null) {
    return this.http.get(`${this.realDatabase}/visita/${id}.json` + this.auth + token);
  }

  // Metodos de registro

  AddCliente(cliente: ClientesModel) {
    return this.http.post(`${this.realDatabase}/clientes.json`, cliente)
      .pipe(
        map((resp: any) => {
          cliente.id = resp.name;
          return cliente;
        })
      )
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
