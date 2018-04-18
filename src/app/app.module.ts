import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { DatePickerModule } from 'ionic3-datepicker';

import { MyApp } from './app.component';
import { PerfilPage } from '../pages/perfil/perfil';
import { PlanPage as ModalPlanPage, ModalContentPage } from '../pages/plan/plan';
import { ServicioPage } from '../pages/servicio/servicio';
import { ServicioDetallePage } from '../pages/servicio/detalle/servicio';
import { SolicitudPage } from '../pages/servicio/solicitud/solicitud';
import { FiltroPage } from '../pages/servicio/filtro/filtro'
import { EvolucionPage } from '../pages/evolucion/evolucion';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { PromocionesPage } from '../pages/promociones/promociones';
import { ComunicacionPage } from '../pages/comunicacion/comunicacion';
import { AyudaPage } from '../pages/ayuda/ayuda';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteProvider } from '../providers/remote/remote';
import { AuthProvider } from '../providers/auth/auth';
import { ConfigService } from '../providers/config-service/config-service';
import { NotificacionesProvider } from '../providers/notificaciones/notificaciones';

@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    ModalPlanPage,
    ModalContentPage,
    ServicioPage,
    ServicioDetallePage,
    SolicitudPage,
    FiltroPage,
    EvolucionPage,
    NotificacionesPage,
    ComunicacionPage,
    PromocionesPage,
    AyudaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    DatePickerModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServicioPage,
    ServicioDetallePage,
    SolicitudPage,
    FiltroPage,
    EvolucionPage,
    NotificacionesPage,
    PromocionesPage,
    PerfilPage,
    ComunicacionPage,
    ModalPlanPage,
    ModalContentPage,
    AyudaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteProvider,
    AuthProvider,
    ConfigService,
    NotificacionesProvider
  ]
})
export class AppModule {}
