import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './componentes/header/header.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DomoticaComponent } from './pages/domotica/domotica.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RestauranteComponent } from './pages/restaurante/restaurante.component';
import { ModallocalComponent } from './componentes/modallocal/modallocal.component';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http'
import { HelpComponent } from './pages/help/help.component';
import { PaginaWebComponent } from './pages/pagina-web/pagina-web.component';
import { SesionComponent } from './pages/sesion/sesion.component';
import { RegistroComponent } from './pages/registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    LessonComponent,
    PerfilComponent,
    SettingsComponent,
    DomoticaComponent,
    RestauranteComponent,
    ModallocalComponent,
    HelpComponent,
    PaginaWebComponent,
    SesionComponent,
    RegistroComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
  ],
  providers: [TextToSpeech,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
