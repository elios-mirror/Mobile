import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthModule} from "../pages/auth/auth.module";
import {MainModule} from "../pages/main/main.module";
import {ProvidersModule} from "../providers/providers.module";
import {MirrorModule} from "../pages/mirror/mirror.module";
import { TabProvider } from '../providers/tab/tab';
import { ModuleProvider } from '../providers/module/module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    IonicStorageModule.forRoot(),
    AuthModule,
    MainModule,
    ProvidersModule,
    MirrorModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TabProvider,
    ModuleProvider,
  ]
})
export class AppModule {}
