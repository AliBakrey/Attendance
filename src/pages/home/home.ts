import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HttpClient } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NgZone } from "@angular/core";


// providers
import { BeaconProvider } from '../../providers/beacon/beacon';
import { WebserviceProvider } from '../../providers/webservice/webservice';

// models
import { BeaconModel } from '../../models/beacon-model';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // IBeacon protocol
  beacons: any;
  zone: any;
  currentTime: any;
  resTime: any;

  lastDiscoveredTime = new Date().getTime();
  //eddystone protocol
  beaconData: any;
  splash = true;
  device_id: String = '';
  imei: String = '6565s565ds6s';
  data: any;
  beaconId: String = 'AwOq/hUWqv4AvyiQ5zJMFRlGOBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  isAttend: boolean = true;
  isLeave: boolean = false;
  calBackFail: boolean = true;
  // isListen: boolean = true;
  scanRecord: any;
  interval: number = 10000;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webserves: WebserviceProvider,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public androidPermissions: AndroidPermissions,
    private backgroundMode: BackgroundMode,
    private platform: Platform,
    public beaconProvider: BeaconProvider,
    public events: Events
  ) {

    // required for UI update
    this.zone = new NgZone({ enableLongStackTrace: false });

    this.listenToBeaconEvents();

    // console.log('isListen inside instructor ' + this.isListen);
    var that = this;


    setInterval(function () {
      that.currentTime = new Date().getTime();
      that.resTime = that.currentTime - that.lastDiscoveredTime;
      console.log("sumTime" + that.resTime);
      if (that.resTime > 10000) {
        that.leave();
      }
    }, 10000);


  }

  // isListenTrue() {
  //     var that = this;
  //     setInterval(function () {
  //       console.log('setInterval started');
  //       // that.isListen = true;


  //     }, 2000);

  // }

  listenToBeaconEvents() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        this.lastDiscoveredTime = new Date().getTime();
        this.beaconData = data;
        console.log("=>>>>>>>  " + data);
        this.scanRecord = this.beaconData.scanRecord
        // console.log("scanRecord scanRecord ====>" + this.scanRecord);
        // console.log('isListen inside scan ' + this.isListen);

        this.callAttendance();
        // this.calBackFail = false;
        // this.scanRecord = " ";
        console.log("scanRecord isAttendance after condition ====>" + this.scanRecord);
      }, (failCallback) => {
        // if (this.beaconId == this.scanRecord) {

        //   if (this.isLeave == true) {
        //     // console.log('leave func');
        //     this.leave();
        //   }

        // }
        console.log("failCallback " + failCallback)
        console.log('evothings.eddystone.calculateAccuracy ' + evothings.eddystone.calculateAccuracy);

      });
    })
  }

  stopScanning() {
    evothings.eddystone.stopScan((data) => {
      console.log('StopScanning work =>  ' + data);
    });
  }

  callAttendance() {

    // console.log('isListen inside isAttendance ' + this.isListen);
    // console.log('isAttendance function  ' + this.isAttend);
    //  this.beacon = Beacon 1 id

    if (this.beaconId == this.scanRecord) {

      this.lastDiscoveredTime = Date.now();
      console.log("lastDiscoveredTime => " + this.lastDiscoveredTime);
      // var d = new Date().getTime();
      // var d2 = new Date();
      // var n = d.toLocaleTimeString();
      // console.log("time now = " + d);

      if (this.isAttend == true) {
        console.log('attend func');
        this.attend();
        // this.isListen = false;

      } else {
        // this.leave();
      }

    } else {


    }

    // this.beaconId=" ";
  }
  backgroundModeFunc() {
    this.backgroundMode.enable();
    this.backgroundMode.on('activate').subscribe(() => {
      console.log('Background mode');
      this.listenToBeaconEvents();
      // this.isAttendance();
    });
  }

  attend() {


    // console.log('attend ya mena');
    this.http.post(this.webserves.attend, {
      "deviceId": "this.device_id",
      "type": "attend"
    })
      .subscribe(data => {
        console.log(data);

      });
    this.isAttend = false;
    this.isLeave = true;
    this.scanRecord = " ";
    console.log('Scan Record => ' + this.scanRecord)
    // this.calBackFail = true;
  }

  leave() {
    if (this.isLeave == true) {
      this.http.post(this.webserves.leave, {
        "deviceId": this.device_id,
        "time": "12:40 PM",
        "type": "leave"
      })
        .subscribe(data => {
          console.log(data);
          this.isLeave = false;
          this.isAttend = true;
        });

    }

  }

  // millisToMinutesAndSeconds(millis) {
  //   var minutes = Math.floor(millis / 60000);
  //   var seconds = ((millis % 60000) / 1000).toFixed(0);
  //   return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  // }

  // async  getimei() {
  //   const { hasPermission } = await this.androidPermissions.checkPermission(
  //     this.androidPermissions.PERMISSION.READ_PHONE_STATE
  //   );

  //   if (!hasPermission) {
  //     const result = await this.androidPermissions.requestPermission(
  //       this.androidPermissions.PERMISSION.READ_PHONE_STATE
  //     );

  //     if (!result.hasPermission) {
  //       throw new Error('Permissions required');
  //     }
  //     // ok, a user gave us permission, we can get identifiers after
  //     // restart the application
  //     return 0;
  //   }
  //   this.device_id = this.uid.IMEI

  //   return this.uid.IMEI;


  // }


  // showAlert(data) {
  //   const alert = this.alertCtrl.create({
  //     title: 'Response',
  //     subTitle: data,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  listenToBeaconEventsIbeacon() {
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {

      // console.log(data);
      // update the UI with the beacon list
      this.zone.run(() => {

        this.beacons = [];
        // this.attend();

        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {
          let beaconObject = new BeaconModel(beacon);
          this.beacons.push(beaconObject);
          console.log(JSON.stringify(this.beacons));
        });

      });

    });
  }


  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
    }, 4000);
    console.log('ionViewDidLoad HomePage');
    // IBeacon protocol
    this.platform.ready().then(() => {
      this.beaconProvider.initialise().then((isInitialised) => {
        if (isInitialised) {
          this.listenToBeaconEventsIbeacon();
        }
      });
    });

    // this.backgroundModeFunc();
  }





}
