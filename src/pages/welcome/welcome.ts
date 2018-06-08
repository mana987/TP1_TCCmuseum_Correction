import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// Native Component

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  database: SQLiteObject;
  progress = 0;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initDb();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  // initialisation DB

  initDb() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.createOeuvresTable();
        // this.dropOeuvresTable();
      })
      .catch(e => console.log(e));
  }

  // Creation Table

  createOeuvresTable() {

    this.database.executeSql('CREATE TABLE IF NOT EXISTS oeuvres (id INTEGER PRIMARY KEY, lastname TEXT, firstname TEXT, image TEXT, code INTEGER, checked INTEGER)', {})
      .then(() => {
        this.checkOeuvresExists()
          .then((data) => {
            let totalOeuvres = data;
            console.log('total oeuvres', data);
            if (totalOeuvres == 21) this.redirectToTabs();
            else this.insertOeuvresDatas();
          })
      })
      .catch(e => console.log(e));

  }

  // Effacer la table
  
  dropOeuvresTable(): any {
    this.database.executeSql('DROP TABLE oeuvres', {})
      .then(() => {
        console.log('table oeuvres dropped')
      })
      .catch(() => {

      })
  }

  checkOeuvresExists(): any {

    return this.database.executeSql('SELECT * FROM oeuvres', {})
      .then((data) => {
        return data.rows.length;
      })
      .catch(e => console.log(e));
  }

  insertOeuvresDatas() {

    let inserts =
      "INSERT INTO `oeuvres` VALUES (1,'ALVAREZ','Jean-Pierre','9213750369.jpg',9213750369,0)," +
      "(2,'ARAI','Poeragni','6510403686.jpg',6510403686,0)," +
      "(3,'CHANSIN','Jérôme','7216899933.jpg',7216899933,0)," +
      "(4,'CHEUNG-SEN ','Jonas','1629568455.jpg',1629568455,0)," +
      "(5,'CUNY','Heimana','9266553664.jpg',9266553664,0)," +
      "(6,'EBB','Nicolas','1168085824.jpg',1168085824,0)," +
      "(7,'LEHARTEL','Alexandre','2791010818.jpg',2791010818,0)," +
      "(8,'LENOIR','Tetuaoro','4173047359.jpg',4173047359,0)," +
      "(9,'LONGINE','Manaarii ','9782420312.jpg',9782420312,0)," +
      "(10,'LY','Joane ','6872232276.jpg',6872232276,0)," +
      "(11,'MARO','Teremu ','1234567890.jpg',1234567890,0)," +
      "(12,'MONACO','Vaitiare','4653519064.jpg',4653519064,0)," +
      "(13,'PAEAHI','Ariipaea','3658034121.jpg',3658034121,0)," +
      "(14,'PAMBRUN','Aito ','5175547403.jpg',5175547403,0)," +
      "(15,'PAMBRUN','Hiomai','9520532017.jpg',9520532017,0)," +
      "(16,'PEREZ','Rahiti','1228597258.jpg',1228597258,0)," +
      "(17,'PERRY','Matihamu ','5480211371.jpg',5480211371,0)," +
      "(18,'ROUSSEL','Christian ','2462643924.jpg',2462643924,0)," +
      "(19,'TEHUPE','Tinirau ','5055364030.jpg',5055364030,0)," +
      "(20,'TEMATAHOTOA','Tinirau ','6232447902.jpg',6232447902,0)," +
      "(21,'TOOFA','Teparii ','4235066246.jpg',4235066246,0);";

    this.database.executeSql(inserts, {})
      .then(() => {
        this.redirectToTabs()
      })
      .catch((e) => console.log('error', e));
  }

  redirectToTabs() {
    let limit = 5;
    let counter = 0;
    let myInterval = setInterval(() => {
      counter++;
      console.log('count', counter);
      this.progress = counter * 100 / limit;
      console.log('progress', this.progress);
      if (counter == limit) {
        clearInterval(myInterval);
        this.navCtrl.push(TabsPage);
      }
    }, 1000);
  }
}
