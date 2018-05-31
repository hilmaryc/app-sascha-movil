import { Component } from '@angular/core';
import { IonicPage NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detaevo',
  templateUrl: 'meta.html',
})
export class MetaPage {
  
  public metas: any[]=[];
  
  constructor(public navParams: NavParams) {
    this.metas = navParams.data;
    console.log(this.metas)
  }

}
