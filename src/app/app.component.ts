import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Loading, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Storage } from '@ionic/storage';
import { ServicioPage } from '../pages/servicio/servicio';

import { AuthProvider } from '../providers/auth/auth';

import { FCM } from '@ionic-native/fcm';
import { Observable } from 'rxjs/Rx';
import { NotificacionesProvider } from '../providers/notificaciones/notificaciones';
import { AppservicioProvider } from '../providers/appservicio/appservicio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public TAG: string = 'MyApp';
  public loading: Loading;
  rootPage: any;
  showMenu: any = 0;
  pages: Array<{title: string, component: any}>;

  public subscription;
  public index = 0;
  public id_cliente = null;

  constructor(
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public notificacionesProv: NotificacionesProvider,
    public auth: AuthProvider,
    private storage: Storage,
    private fcm: FCM,
    public serviApp: AppservicioProvider) {
    this.rootPage = null;
    this.platform.ready().then(() => {
      /*this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.READ_CONTACTS,
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      ]);*/
      ///////////
      //Notifications
      /*
      fcm.subscribeToTopic('all');
      fcm.getToken().then(token=>{
        console.log(token);
      })
      */
      /*
      fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      })
      fcm.onTokenRefresh().subscribe(token=>{
        console.log(token);
      });
      //end notifications.
      ////////
      */

      this.statusBar.styleDefault();
      this.hideSplashScreen();
      this.isAuth();
    });
  }

  ngOnInit() {
    this.subscription = Observable.interval(10000).subscribe(x => {
      if ( this.id_cliente == null ) this.getCliente()
      else this.getNotificaciones(this.id_cliente);
    });
  }

  async getCliente(){
    let metodo = ': metodo getCliente';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
            this.id_cliente = usuario.data.cliente.id_cliente;
            this.serviApp.activarProgreso(false,this.TAG + metodo);
          })
          .catch((err) =>{
            this.serviApp.errorConeccion(err);
          });
    });
  }

  async getNotificaciones(id_cliente): Promise<void> {
    let metodo =':metodo getNotificaciones';
    await this.notificacionesProv.get(id_cliente)
      .subscribe(
      (res)=>{
        this.storage.remove('notificacion');
        this.storage.set('notificaciones', res['data']);
        console.log(res['data']);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

    // to unsubscribe the function and stop the iterations
  stopTheIterations () {
    this.subscription.unsubscribe();
  }

  hideSplashScreen() {
    console.log(this.TAG,JSON.stringify(this.splashScreen));
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }

  async isAuth(){
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
              var error: boolean = usuario.error;
              if ( !error ) {
                this.showMenu = 1;
                this.pages = [
                  { title:  usuario.data.cliente.nombres , component: 'PerfilPage' },
                  { title: 'Servicio', component: ServicioPage },
                  { title: 'Mi Plan', component: 'PlanPage' },
                  { title: 'Mi Evolucion', component: 'EvolucionPage' },
                  { title: 'Contacto', component: 'ComunicacionPage' },
                  { title: 'Ayuda', component: 'AyudaPage' }          
                ];
                this.rootPage = ServicioPage;
              }
          })
          .catch((err) =>{
            console.log(err);
            this.rootPage = 'LoginPage';
          });
    });
  }

  async logoutUser() { 
    console.log(this.TAG,' logoutUser ' + 'se ha removido el token');
    await this.storage.remove('usuario');
    await this.storage.clear();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.logoutUser();
    this.showMenu = 0;
    window.location.reload();
  }

}
