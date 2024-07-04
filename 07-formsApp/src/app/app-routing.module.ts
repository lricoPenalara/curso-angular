import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Acceder a todos los formularios reactivos
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.module').then( m => m.ReactiveModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {
    path: '**', //ruta por defecto si no pongo nada en la ruta
    redirectTo: 'reactive',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
