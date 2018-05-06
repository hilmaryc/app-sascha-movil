import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { DatePickerModule } from 'ionic3-datepicker';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { PerfilPage } from '../pages/perfil/perfil';
import { PlanPage as ModalPlanPage, ModalContentPage } from '../pages/plan/plan';
import { ServicioPage } from '../pages/servicio/servicio';
import { ServicioDetallePage } from '../pages/servicio/detalle/servicio';
import { SolicitudPage } from '../pages/servicio/solicitud/solicitud';
import { FiltroPage } from '../pages/servicio/filtro/filtro'
import { EvolucionPage } from '../pages/evolucion/evolucion';
import { DetalleEvolucionPage } from '../pages/evolucion/detalle/detalle';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { PromocionesPage } from '../pages/promociones/promociones';
import { ComunicacionPage } from '../pages/comunicacion/comunicacion';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { DetallenotiPage } from '../pages/detallenoti/detallenoti';

import { RemoteProvider } from '../providers/remote/remote';
import { AuthProvider } from '../providers/auth/auth';
import { ConfigService } from '../providers/config-service/config-service';
import { NotificacionesProvider } from '../providers/notificaciones/notificaciones';
import { ServiciosProvider } from '../providers/servicios/servicios';
import { PromocionesProvider } from '../providers/promociones/promociones';
import { EstadocivilesProvider } from '../providers/estadociviles/estadociviles';
import { GenerosProvider } from '../providers/generos/generos';
import { PerfilProvider } from '../providers/perfil/perfil';
import { MotivosProvider } from '../providers/motivos/motivos';
import { BloquehorariosProvider } from '../providers/bloquehorarios/bloquehorarios';
import { AppservicioProvider } from '../providers/appservicio/appservicio';
import { EspecialidadesProvider } from '../providers/especialidades/especialidades';
import { EmpleadosProvider } from '../providers/empleados/empleados';
import { MotivosSolicitudProvider } from '../providers/motivos-solicitud/motivos-solicitud';
import { SolicitudesProvider } from '../providers/solicitudes/solicitudes';

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
    DetalleEvolucionPage,
    NotificacionesPage,
    ComunicacionPage,
    PromocionesPage,
    AyudaPage,
    DetallenotiPage
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
    DetalleEvolucionPage,
    NotificacionesPage,
    PromocionesPage,
    PerfilPage,
    ComunicacionPage,
    ModalPlanPage,
    ModalContentPage,
    AyudaPage,
    DetallenotiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteProvider,
    AuthProvider,
    ConfigService,
    NotificacionesProvider,
    ServiciosProvider,
    PromocionesProvider,
    EstadocivilesProvider,
    GenerosProvider,
    PerfilProvider,
    MotivosProvider,
    BloquehorariosProvider,
    AppservicioProvider,
    EspecialidadesProvider,
    EmpleadosProvider,
    MotivosSolicitudProvider,
    SolicitudesProvider
  ]
})
export class AppModule {}
