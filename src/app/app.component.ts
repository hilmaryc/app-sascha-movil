import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { ServicioPage } from '../pages/servicio/servicio';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { PromocionesPage } from '../pages/promociones/promociones';
import { PlanPage as ModalPlanPage } from '../pages/plan/plan';
import { ComentarioPage } from '../pages/comentarios/comentario';
import { ReclamoPage } from '../pages/reclamos/reclamo';

import { AuthProvider } from '../providers/auth/auth';

import firebase from 'firebase';
import { Unsubscribe } from '@firebase/util';

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

     firebase.initializeApp({
      apiKey: "AIzaSyB-JoyYYCMqG6nwepNr9miggpIIcLviFk8",
      authDomain: "app-sascha-movil-a631e.firebaseapp.com",
      databaseURL: "https://app-sascha-movil-a631e.firebaseio.com",
      projectId: "app-sascha-movil-a631e",
      storageBucket: "app-sascha-movil-a631e.appspot.com",
      messagingSenderId: "688850941863"
    });

    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      /*
      if (user) {
        this.rootPage = HomePage;
        unsubscribe();
         this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Notificaciones', component: NotificacionesPage },
          { title: 'Perfil', component: PerfilPage },
          { title: 'Cerrar Sesion', component: LogoutPage }
        ];
      } else {
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
      */
     // this.rootPage = HomePage;
      this.pages = [
          { title: 'Inicio', component: HomePage },
          { title: 'Mi Perfil', component: PerfilPage },
          { title: 'Mi Plan', component: ModalPlanPage },
          { title: 'Servicios', component: ServicioPage },
          { title: 'Notificaciones', component: NotificacionesPage },
          { title: 'Promociones', component: PromocionesPage },
          { title: 'Comentarios', component: ComentarioPage },
          { title: 'Reclamos', component: ReclamoPage }
      ];

    });

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
