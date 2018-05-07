import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';

import { ServicioPage } from '../pages/servicio/servicio';

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
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    MyApp,
    ServicioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServicioPage
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
    SolicitudesProvider,
    AndroidPermissions
  ]
})
export class AppModule {}
