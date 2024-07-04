import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'sign-up', component: RegisterPageComponent },
      { path: '**', redirectTo: 'sign-up' }, //ruta por defecto si solo pongo auth
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
