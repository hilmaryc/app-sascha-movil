import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
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

  public TAG: string = 'MyApp';
  rootPage: any = null;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
    private storage: Storage) {
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
        this.isAuth();    
      });
  }

  isAuth(){
    this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
              console.log(this.TAG,' isAuth ' + JSON.stringify(usuario.error));
              this.rootPage = ServicioPage;
          })
          .catch(console.log);
    });
    this.rootPage = 'LoginPage';
  }

  logoutUser() { 
    console.log(this.TAG,' logoutUser ' + 'se ha removido el token');
    this.storage.remove('usuario');
    this.storage.clear();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.logoutUser();
    this.rootPage = 'LoginPage';
  }

}
