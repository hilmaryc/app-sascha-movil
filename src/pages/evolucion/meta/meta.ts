import { Component } from '@angular/core';
import { IonicPage NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detaevo',
  templateUrl: 'meta.html',
})
export class MetaPage {
  
  public metas: any[]=[];
  
  constructor(
    public navParams: NavParams, 
    ) {
    let visitas = navParams.data;
    for ( let i in visitas ){
      let visita = visitas[i];
      if ( '[' + JSON.stringify(visita.metas[i]) + ']' != '[undefined]' ) {
        if ( visita.metas.length > 0  && this.metas.length == 0) {
          this.metas.push({
            "parametro": visita.metas[0].parametro,
            "valor_minimo": visita.metas[0].valor_minimo,
            "unidad_abreviatura": visita.metas[0].unidad_abreviatura
          });
        }
        let enc: boolean = false;
        for ( let j in this.metas ){
          if ( this.metas[j].parametro == visita.metas[i].parametro && 
              this.metas[j].valor_minimo == visita.metas[i].valor_minimo ){
            enc = true
            break
          }
        }
        if(!enc){
          this.metas.push({
            "parametro": visita.metas[i].parametro,
            "valor_minimo": visita.metas[i].valor_minimo,
            "unidad_abreviatura": visita.metas[i].unidad_abreviatura
          });
        }
      }
    }
  }

}
