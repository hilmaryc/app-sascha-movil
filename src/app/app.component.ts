import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { ServicioPage } from '../pages/servicio/servicio';
import { PedircitaPage } from '../pages/pedircita/pedircita';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { PromocionesPage } from '../pages/promociones/promociones';
import { PlanPage as ModalPlanPage } from '../pages/plan/plan';
import { ComentarioPage } from '../pages/comentarios/comentario';
import { ReclamoPage } from '../pages/reclamos/reclamo';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthProvider) {

      this.rootPage = HomePage;

      this.pages = [
          { title: 'Inicio', component: HomePage },
          { title: 'Mi Perfil', component: PerfilPage },
          { title: 'Mi Plan', component: ModalPlanPage },
          { title: 'Servicios', component: ServicioPage },
          { title: 'Pedir cita', component: PedircitaPage },
          { title: 'Notificaciones', component: NotificacionesPage },
          { title: 'Promociones', component: PromocionesPage },
          { title: 'Comentarios', component: ComentarioPage },
          { title: 'Reclamos', component: ReclamoPage }
      ];

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logoutUser();
    this.rootPage = 'LoginPage';
  }

}
