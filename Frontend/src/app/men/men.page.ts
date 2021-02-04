import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminService } from '../admin/service.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.page.html',
  styleUrls: ['./men.page.scss'],
})

export class MenPage implements OnInit {
 f1()
 {
   this.adminService.add_cart=true;
   this.adminService.add_cart3=false
    this.adminService.add_cart2=false
 }

  // public adminService: any;
  // public alertCtrl;
  // constructor(alertCtrl, adminService) {
  //   this.adminService=adminService;
  //   this.alertCtrl=alertCtrl
  // }
  constructor(public adminService: AdminService, public alertCtrl: AlertController) { }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Congratulations',

      message: 'Your item has been added to the cart',

      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
  ngOnInit() {
  }

}
