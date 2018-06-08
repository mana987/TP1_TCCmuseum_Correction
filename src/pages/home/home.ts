import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  oeuvres = [];
  totalOeuvres = 0;
  totalChecked = 0;

  constructor(public navCtrl: NavController, private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {

    })
  }

  ionViewWillEnter() {
    this.getOeuvres();
  }

  getOeuvres() {
    this.oeuvres = [];
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM oeuvres', {})
          .then((data) => {
            this.totalOeuvres = data.rows.length;
            this.totalChecked = 0;
            for (let i = 0; i < data.rows.length; i++) {
              this.oeuvres.push(data.rows.item(i))
              if (data.rows.item(i).checked == 1) this.totalChecked++;
            }
          });
      });
  }

}
