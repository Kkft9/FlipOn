import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage implements OnInit
{
  static searchContent:any[] = [];
 static product_value;
  f1() {
    this.adminService.add_cart3=true;
    this.adminService.add_cart=false
    this.adminService.add_cart2=false
    this.adminService.add_cart_watch=false
    this.adminService.add_cart_women=false
      }
  searche(search_value)
   {
    const postData={'search':search_value}
    ProductDetailsPage.product_value=search_value
    this.http.post("http://127.0.0.1:8000/product-details/" , postData).subscribe(data =>{
      ProductDetailsPage.searchContent=data['details'];
      console.log(this.staticname);



   })
  }

  get staticname() {
    return ProductDetailsPage.searchContent;
  }
  get staticproduct_value() {
    return ProductDetailsPage.product_value;
  }

  constructor(public adminService: AdminService, public alertCtrl: AlertController,public http : HttpClient) { }

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
