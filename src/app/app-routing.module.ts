import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { VisitaComponent } from './components/visita/visita.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'visita', component: VisitaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '**' , redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
