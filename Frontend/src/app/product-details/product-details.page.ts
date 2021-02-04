import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminService } from '../admin/service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  f1()
  {
    this.adminService.add_cart3=true;
    this.adminService.add_cart=false
    this.adminService.add_cart2=false
  }

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
