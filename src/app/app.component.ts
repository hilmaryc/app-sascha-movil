import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

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
    public splashScreen: SplashScreen) {

     firebase.initializeApp({
      apiKey: "AIzaSyB-JoyYYCMqG6nwepNr9miggpIIcLviFk8",
      authDomain: "app-sascha-movil-a631e.firebaseapp.com",
      databaseURL: "https://app-sascha-movil-a631e.firebaseio.com",
      projectId: "app-sascha-movil-a631e",
      storageBucket: "app-sascha-movil-a631e.appspot.com",
      messagingSenderId: "688850941863"
    });

    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.rootPage = HomePage;
        unsubscribe();
         this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'List', component: ListPage }
        ];
      } else {
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
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
}
