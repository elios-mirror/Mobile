import {Component, OnInit} from '@angular/core';
import {ModuleDto} from '../../../../services/mirror/mirror.dto';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {MirrorService} from '../../../../services/mirror/mirror.service';
import {NavController, PopoverController} from '@ionic/angular';
import {MirrorPopoverComponent} from './mirror-popover/mirror-popover.component';

@Component({
  selector: 'app-mirror',
  templateUrl: './mirror.page.html',
  styleUrls: ['./mirror.page.scss'],
})
export class MirrorPage implements OnInit {

  public mirror: any = null;
  public modules: Array<ModuleDto> = [];
  public loader = true;

  constructor(private route: ActivatedRoute, private mirrorService: MirrorService,
              private popoverCtrl: PopoverController, private navCtrl: NavController) {

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.mirror = JSON.parse(params.special);
        console.log(this.mirror);
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.refreshMirrorInfos();
  }

  refreshMirrorInfos() {
    this.loader = true;
    this.mirrorService.getMirror(this.mirror.id).then(result => {
      this.mirror = result;
      this.modules = result.modules;
      this.loader = false;
    });
  }

  public async mirrorSettings(ev: UIEvent) {
    const popover = await this.popoverCtrl.create({
      component: MirrorPopoverComponent,
      componentProps: {
        'mirror': this.mirror
      },
      event: ev,
      translucent: true
    });

    return await popover.present();
  }

  public navigateAppDetails(application) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        mirror: JSON.stringify(this.mirror),
        application: JSON.stringify(application)
      }
    };
    this.navCtrl.navigateForward(['/store/app-details'], navigationExtras);
  }

}
