import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-evolucion',
  templateUrl: 'evolucion.html',
})
export class EvolucionPage {
  evolucion;
  public data:any;
  public services: any = [{
    "tipo_parametro":"Antropometrico",
    "parametro":"peso",
    "valor":"50kg"
  },{
    "tipo_parametro":"Bioquimico",
    "parametro":"Glicemia",
    "valor":"92 mg/dm"
  },{
    "tipo_parametro":"Patologico",
    "parametro":"Diabetes",
    "valor":" "
  }];

  public visitas: any = [{
    "numero_visita":"2",
    "fecha_visita":"15/05/2018"
  },{
    "numero_visita":"1",
    "fecha_visita":"10/04/2018"
  }];

  public localDate: Date = new Date();
  //public initDate: Date = new Date();
  public initDate: Date = new Date(2018, 4, 15);
  
  public min: Date = new Date();
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 800));

  public disabledDates: Date[] = [new Date(2018, 3, 1), new Date(2018, 3, 3), new Date(2018, 3, 5)];
  public markDates: Date[] = [new Date(2018, 3, 2), new Date(2018, 3, 4), new Date(2018, 3, 6)];

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.evolucion = "perfil";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvolucionPage');
  }

  public Log(stuff): void {
    console.log(stuff);
  }
  public event(data: Date): void {
    this.localDate = data;
  }

  setDate(date: Date) {
    console.log(date);
    this.initDate = date;
  }


}
