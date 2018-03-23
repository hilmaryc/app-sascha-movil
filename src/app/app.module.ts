import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { PlanPage as ModalPlanPage, ModalContentPage } from '../pages/plan/plan';
import { ServicioPage } from '../pages/servicio/servicio';
import { PedircitaPage } from '../pages/pedircita/pedircita'
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { PromocionesPage } from '../pages/promociones/promociones';
import { ComentarioPage } from '../pages/comentarios/comentario';
import { ReclamoPage } from '../pages/reclamos/reclamo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteProvider } from '../providers/remote/remote';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    ModalPlanPage,
    ModalContentPage,
    ServicioPage,
    PedircitaPage,
    NotificacionesPage,
    ComentarioPage,
    ReclamoPage,
    PromocionesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ServicioPage,
    PedircitaPage,
    NotificacionesPage,
    PromocionesPage,
    PerfilPage,
    ComentarioPage,
    ReclamoPage,
    ModalPlanPage,
    ModalContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteProvider,
    AuthProvider
  ]
})
export class AppModule {}
