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
  public filtrables:any[]=[];
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
  
  public evalParametros: any[] = [];

  constructor(
    public platform: Platform,
    public alertCtrl: AlertController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public filtrablesProv: TipoparametrosProvider,
    public serviApp: AppservicioProvider) { }

  ngOnInit(){
    this.filtro = "filtroTop";
    this.getFiltrables();
  }

  async getFiltrables(): Promise<void> {
    let metodo = ': metodo getTipoParametros';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.filtrablesProv.getAll()
    .subscribe(
      (res)=>{
        this.filtrables = res['data'] || [];
        this.serviApp.activarProgreso(false,this.TAG + metodo);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  selectView(id_tipo_parametro,parametros){
    let aux: any[]=[];
    for ( let i in this.evalParametros ){
      if ( this.evalParametros[i].id_tipo_parametro == id_tipo_parametro ){
        aux = this.evalParametros[i].parametros;
        break;
      } 
    }
    let objetos: any[] = parametros
    if (objetos.length != 0){
      let myImputs:any =[];
      for ( let i in objetos ){
        let isCheck: boolean = true;
        for ( let y in aux){
          if ( objetos[i].id_parametro == aux[y].id_parametro ){
            isCheck = true;
            break;
          }else isCheck = false;
        }
        let data:any = { 
          type: 'checkbox',
          label: objetos[i].nombre,
          value: objetos[i],
          checked: isCheck
        };
        myImputs.push(data);
      }
      this.alertSelection(id_tipo_parametro,myImputs);
    }
  }

  alertSelection(id_tipo_parametro,myImputs){
   let editar = this.alertCtrl.create({
      title: 'selectores',
      inputs: myImputs,
      buttons: [{
        text: 'Cancelar',
        handler: data => {
          console.log('Cancelar clicked' + JSON.stringify(data) );
        }
      } , {
        text: 'Ok',
        handler: data => {
          let objeto = {
            id_tipo_parametro: id_tipo_parametro,
            parametros: data
          };
          let index: any = -1;
          if ( this.evalParametros.length == 0 ){
            this.evalParametros.push(objeto);
          } else {
            let enc: boolean = false;
            for ( let i in this.evalParametros ){
              if ( this.evalParametros[i].id_tipo_parametro == objeto.id_tipo_parametro ){
                index = i;
                enc = true;
                break;
              } 
            }  
            if (!enc) this.evalParametros.push(objeto);
            else if ( index != -1 ) this.evalParametros[index] = objeto;
          }
        }
      }]
    });
    editar.present();
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  aceptar(){

    let id_parametros: any[]=[];
    for ( let i in this.evalParametros ){
      for ( let y in this.evalParametros[i].parametros ){
        id_parametros.push(this.evalParametros[i].parametros[y].id_parametro)
      }
    }

    this.viewCtrl.dismiss({
      "id_parametros": id_parametros
    }); 
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
  
  onChange( valor ){
    console.info("onChange:");
    console.info(valor);
  }

  onClick( params ){
    console.info("onClick:");
    console.info(params);
  }

}
