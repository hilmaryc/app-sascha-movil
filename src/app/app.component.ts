import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Loading, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { ServicioPage } from '../pages/servicio/servicio';

import { AuthProvider } from '../providers/auth/auth';

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
  public _isAuth:boolean = false;

  constructor(
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public notificacionesProv: NotificacionesProvider,
    public auth: AuthProvider,
    private storage: Storage,
    public serviApp: AppservicioProvider) {
    this.rootPage = null;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.hideSplashScreen();
      this.isAuth();
    });
  }

  ngOnInit() {
    let time: number = 10000*1;
    this.subscription = Observable.interval(time).subscribe(x => {
      if (this._isAuth){
        if (this.id_cliente == null) this.getCliente();
        else this.getNotificaciones(this.id_cliente);
      } 
    });
  }

  async getCliente(){
    let metodo = ': metodo getCliente';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
            this.id_cliente = usuario.data.cliente.id_usuario;
            //console.log(usuario)
            this.serviApp.activarProgreso(false,this.TAG + metodo);
          })
          .catch((err) =>{
            console.log(err);

          });
    });
  }

  async getNotificaciones(id_cliente): Promise<void> {
    await this.notificacionesProv.get(id_cliente)
      .subscribe(
      (res)=>{
        this.storage.remove('notificaciones');
        this.storage.set('notificaciones', res['data']);
       // console.log(res['data']);
      },
      (error)=>{
        console.log(error);
      }
    );  
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
              console.log('Usuario: '+usuario.data.cliente.id_usuario)
              var error: boolean = usuario.error;
              this.id_cliente = usuario.data.cliente.id_usuario;
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
                this._isAuth = true;
              }
          })
          .catch((err) =>{
            console.log(err);
            this.rootPage = 'LoginPage';
            this.storage.remove('notificaciones');
            this.storage.clear();
            this._isAuth = false;
          });
    });
  }

  async logoutUser() { 
    console.log(this.TAG,' logoutUser ' + 'se ha removido el token');
    await this.storage.remove('usuario');
    await this.storage.clear();
    this.id_cliente = null;
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.serviApp.loadingDismiss();
    this.logoutUser();
    this.showMenu = 0;
    this.stopTheIterations();
    window.location.reload();
  }

  stopTheIterations () {
    this.subscription.unsubscribe ();
  }
}
