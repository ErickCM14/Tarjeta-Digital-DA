import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private key: string = `AIzaSyAkdG1ayXiDaoqHirWwaU50-44VV_R7QcA`;
  private realDatabase: string = 'https://tarjetadigitalda-default-rtdb.firebaseio.com';

}
