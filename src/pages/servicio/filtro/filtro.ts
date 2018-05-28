import { Component } from '@angular/core';
import { AlertController, IonicPage, Platform, NavParams, ViewController } from 'ionic-angular';

import { TipoparametrosProvider } from '../../../providers/tipoparametros/tipoparametros';
import { AppservicioProvider } from '../../../providers/appservicio/appservicio';

@IonicPage()
@Component({
  selector: 'page-filtro',
  templateUrl: 'filtro.html'
})
export class FiltroPage {
  filtro;

  public TAG:string = 'FiltroPage';
  public parfilter:any;
  public parametros: any[]=[];
  
  constructor(public platform: Platform,
    public params: NavParams,
    public alertCtrl: AlertController,
    public tipoparametrosProv: TipoparametrosProvider,
    public viewCtrl: ViewController,
    public serviApp: AppservicioProvider) {
    this.filtro = "filtroTop";
  }


  async getTipoParametros(): Promise<void> {
    let metodo = ': metodo getTipoParametros';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.tipoparametrosProv.getAll()
      .subscribe(
      (res)=>{
        console.log(res['data'])
        let objetos: any[] = res['data'].parametros || [];
        console.log(res['data'].parametros)
        if (objetos.length != 0){
          let myImputs:any =[];
          for ( let i in objetos ){
            let data:any = { 
              type: 'radio',
              label: objetos[i].nombre,
              value: objetos[i]
            };
            myImputs.push(data);
          }
          this.alertSelection(myImputs,res['data'].nombre);
        }
      this.serviApp.activarProgreso(false,this.TAG + metodo);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  alertSelection(myImputs,titulo){
   let editar = this.alertCtrl.create({
      title: titulo,
      inputs: myImputs,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar clicked' + JSON.stringify(data) );
          }
        },
        {
          text: 'Ok',
          handler: data => {
           console.log('Ok clicked' + JSON.stringify(data) ); 
          }
        }
      ]
    });
    editar.present();
  }

  rangeChange(evento,idRange){
    console.log(evento.value);
    console.log(idRange);
    for( var _i = 0; _i < this.parametros[0].ranges.length; _i++ ){
      if( this.parametros[0].ranges.id == idRange ){
        this.parametros[0].ranges[_i].valor = evento.value;  
      }
      console.log(JSON.stringify(this.parametros[0].ranges[_i]));  
    }
  }

  selectorChange(evento,idRange){
    console.log(evento.value);
    console.log(idRange);
    for( var _i = 0; _i < this.parametros[0].ranges.length; _i++ ){
      if( this.parametros[0].ranges.id == idRange )
        this.parametros[0].ranges[_i].valor = evento.value;  
    } 
    console.log(JSON.stringify(this.parametros[0].ranges[_i]));     
  }

  selectorClick(idSelector,idImagen){
   console.log(idSelector+ '  ' + idImagen );
    for( var _i = 0; _i < this.parametros[0].selectores.length; _i++ ){
        for( var _j = 0; _j < this.parametros[0].selectores[_i].imagenes.length; _j++ ){
          if( this.parametros[0].selectores[_i].id == idSelector && this.parametros[0].selectores[_i].imagenes[_j].id == idImagen ){
            this.parametros[0].selectores[_i].imagenes[_j].isSeleccion = this.parametros[0].selectores[_i].imagenes[_j].isSeleccion ? false : true;
            this.parametros[0].selectores[_i].valor = this.parametros[0].selectores[_i].imagenes[_j].valor;
          } else {
            this.parametros[0].selectores[_i].imagenes[_j].isSeleccion = true;
          }
      }
    } 
    console.log(JSON.stringify(this.parametros[0].ranges[_i]));     
  }

  checkClick(){

  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  aceptar(){
   this.viewCtrl.dismiss(); 
  }

  onChange( valor ){
    console.info("onChange:");
    console.info(valor);
  }

  onClick( params ){
    console.info("onClick:");
    console.info(params);
  }

}
