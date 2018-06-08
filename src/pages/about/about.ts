import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector   : 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private platform:Platform) {
    this.platform.ready().then(() => {
      
    })
  }

}
