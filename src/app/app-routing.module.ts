import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DomoticaComponent } from './pages/domotica/domotica.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RestauranteComponent } from './pages/restaurante/restaurante.component';
import { HelpComponent } from './pages/help/help.component';
import { PaginaWebComponent } from './pages/pagina-web/pagina-web.component';
import { SesionComponent } from './pages/sesion/sesion.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';

const uidAdmin = 'Q72B9hXVJxP5BgdBINDmaRCHFMl1';
const onlyAdmin = () => map( (user: any) => !!user && user.uid === uidAdmin);

const routes: Routes = [
  //Ruta vacia
  {path: '', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lesson', component: LessonComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'settings', component: SettingsComponent, ...canActivate(onlyAdmin) },
  {path: 'domotica', component: DomoticaComponent },
  {path: 'restaurante', component: RestauranteComponent},
  {path: 'help', component: HelpComponent},
  {path: 'logins', component: SesionComponent},
  {path: 'register', component: RegistroComponent},
  {path: 'page/:nombre', component: PaginaWebComponent},

  //Ruta por defecto
  {path: '**', component:HomeComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
