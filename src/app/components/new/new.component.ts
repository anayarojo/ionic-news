import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() number: Number;
  @Input() new: Article;
  @Input() inFavoritesView = false;

  constructor(private inAppBrowser: InAppBrowser, 
              private actionSheetCtrl: ActionSheetController, 
              private socialSharing: SocialSharing, 
              private localSorageService: LocalStorageService) { }

  ngOnInit() {}

  openNew() {
    console.log(this.new.url);
    const browser = this.inAppBrowser.create(this.new.url, '_system');
  }

  async showMore() {
    const actionSheetButtons = this.getActionSheetButtons();
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: actionSheetButtons
    });
    await actionSheet.present();
  }

  private getActionSheetButtons() {
    const actionSheetButtons = [{
      text: 'Share',
      icon: 'share',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Share clicked');
        this.socialSharing.share(
          this.new.title,
          this.new.source.name,
          '',
          this.new.url
        );
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      cssClass: 'action-dark',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];

    if (this.inFavoritesView) {
      actionSheetButtons.splice(1, 0, {
        text: 'Remove',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Remove favorite clicked');
          this.localSorageService.removeNews(this.new);
        }
      });
    } else {
      actionSheetButtons.splice(1, 0, {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.localSorageService.saveNew(this.new);
        }
      });
    }
    return actionSheetButtons;
  }

}
