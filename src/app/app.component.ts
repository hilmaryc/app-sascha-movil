import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PerfilPage } from '../pages/perfil/perfil';
import { ServicioPage } from '../pages/servicio/servicio';
import { PlanPage as ModalPlanPage } from '../pages/plan/plan';
import { EvolucionPage } from '../pages/evolucion/evolucion';
import { ComunicacionPage } from '../pages/comunicacion/comunicacion';
import { AyudaPage } from '../pages/ayuda/ayuda';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;
  isAuth: boolean;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthProvider) {
    this.isAuth = this.auth.isAuth();
    if ( this.isAuth == false ) this.rootPage = ServicioPage;
    else this.rootPage = 'LoginPage';
    this.pages = [
          { title: 'Usuario', component: PerfilPage },
          { title: 'Servicio', component: ServicioPage },
          { title: 'Mi Plan', component: ModalPlanPage },
          { title: 'Mi Evolucion', component: EvolucionPage },
          { title: 'Comunicacion', component: ComunicacionPage },
          { title: 'Ayuda', component: AyudaPage }          
      ];

      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logoutUser();
    this.rootPage = 'LoginPage';
  }

}
