import {Component} from '@angular/core';
import {App, NavController, NavParams, PopoverController} from 'ionic-angular';
import {TabProvider} from "../../providers/tab/tab";
import {MirrorPopoverComponent} from "./mirrorPopover/mirror-popover";
import {ModuleProvider} from "../../providers/module/module";
import {AuthServiceProvider} from "../../providers/auth/auth-service";
import {ModuleDetailsPage} from "./module-details/module-details";
import {MirrorProvider} from "../../providers/mirror/mirror.service";
import {TabsPage} from "../main/tabs/tabs";

@Component({
  selector: 'page-mirror',
  templateUrl: 'mirror.html',
})
export class MirrorPage {

  public mirror: any = null;
  public modules: {};
  public loader = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tabProvider: TabProvider,
              private popoverCtrl: PopoverController, private moduleProvider: ModuleProvider,
              private authProvider: AuthServiceProvider, private mirrorProvider: MirrorProvider, private app: App) {
    this.mirror = this.navParams.get('mirror');
  }

  ionViewDidEnter() {
    this.refreshMirrorInfos();
    this.authProvider.getUserToken().then(token => {
      this.moduleProvider.getModules(token).then(result => {
        this.modules = result;
        this.loader = false;
      });
    });
  }

  refreshMirrorInfos() {
    this.authProvider.getUserToken().then(token => {
      this.mirrorProvider.getMirror(token, this.mirror.id).then(result => {
        this.mirror = result;
      });
    });
  }

  navigate(location: string, parameters?: any) {
    switch (location) {
      case 'module':
        this.navCtrl.push(ModuleDetailsPage, {'module': parameters, 'mirror': this.mirror});
        break;
      default:
    }
  }

  public mirrorSettings(ev: UIEvent) {
    let popover = this.popoverCtrl.create(MirrorPopoverComponent, {'mirror': this.mirror, 'parentPage': this});

    popover.present({
      ev: ev
    });
    popover.onDidDismiss(result => {
      if (result && result.logout) {
        this.app.getRootNav().setRoot(TabsPage);
        this.tabProvider.displayTab();
      }
    });
  }

}
