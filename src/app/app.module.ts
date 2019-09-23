import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule} from '@angular/common/http';
import {Uid} from '@ionic-native/uid';
import { Device } from '@ionic-native/device';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import {AndroidPermissions} from '@ionic-native/android-permissions';
import { BackgroundMode } from '@ionic-native/background-mode';

import { MyApp } from './app.component';
import { WebserviceProvider } from '../providers/webservice/webservice';
import { BeaconProvider } from '../providers/beacon/beacon';
import { IBeacon } from '@ionic-native/ibeacon';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    Uid,
    Device,
    UniqueDeviceID,
    IBeacon,
    AndroidPermissions,
    BackgroundMode,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebserviceProvider,
    BeaconProvider
  ]
})
export class AppModule {}
