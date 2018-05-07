import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filtro',
  templateUrl: 'filtro.html'
})
export class FiltroPage {
  filtro;
  public parfilter:any;
  public parametros: any = [{
    "ranges": [{
      "id": "parametro_1",
      "titulo": "Precio",
      "min": 20,
      "max": 100,
      "valor": 100,
      "slep": 2,
      "unidad": "$"
    } , {
      "id": "parametro_2",
      "titulo": "Duracion en",
      "min": 1,
      "max": 10,
      "valor": 10,
      "slep": 1,
      "unidad": "visitas"
    }] ,
    "selectores": [{
      "id": "parametro_3",
      "titulo": "Valorado con",
      "min": 1,
      "max": 5,
      "valor": 5,
      "slep": 1,
      "unidad": "estrellas",
      "tipo_seleccion": "conjunto",
      "imagenes":[{
        "id" : "1",
        "img" : "assets/imgs/estrella1.png",
        "valor" : "1",
        "isSeleccion": true
      } , {
        "id" : "2",
        "img" : "assets/imgs/estrella.png",
        "valor" : "2",
        "isSeleccion": true
      } , {
        "id" : "3",
        "img" : "assets/imgs/estrella3.png",
        "valor" : "3",
        "isSeleccion": true
      }, {
        "id" : "4",
        "img" : "assets/imgs/estrella4.png",
        "valor" : "4",
        "isSeleccion": true
      } , {
        "id" : "5",
        "img" : "assets/imgs/estrella5.png",
        "valor" : "5",
        "isSeleccion": false
      }]
    }],
    "checkeres": []
  } , {
    "ranges": [] ,
    "selectores": [],
    "checkeres": [{
      "id": "parametro_4",
      "titulo": "Patologia uno",
      "patologias": [{
        "id": 1,
        "nombre": "diabetes",
        "valor": false
      } , {
        "id": 2,
        "nombre": "hipertencion",
        "valor": false
      }]
    } , {
      "id": "parametro_5",
      "titulo": "Patologia dos",
      "patologias": [{
        "id": 1,
        "nombre": "diabetes",
        "valor": false
      } , {
        "id": 2,
        "nombre": "hipertencion",
        "valor": false
      }]
    }]
  }];
  
  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) {
    this.filtro = "filtroTop";
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

  ionViewDidLoad() {
    
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
