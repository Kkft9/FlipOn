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
 static title ;
 static price;
 static content;

  searche(search_value)
   {
    const postData={'search':search_value}
    ProductDetailsPage.product_value=search_value
    this.http.post("http://127.0.0.1:8000/product-details/" , postData).subscribe(data =>{
      ProductDetailsPage.searchContent=data['details'];
      ProductDetailsPage.title=data['title'];
      ProductDetailsPage.price=data['price'];
      ProductDetailsPage.content=data['content'];
      console.log(this.staticname);
   })
  }

  get staticname() {
    return ProductDetailsPage.searchContent;
  }

  get statictitle() {
    return ProductDetailsPage.title;
  }
  get staticcontent() {
    return ProductDetailsPage.content;
  }
  get staticprice() {
    return ProductDetailsPage.price;
  }
  get staticproduct_value() {
    return ProductDetailsPage.product_value;
  }

  constructor(public adminService: AdminService, public alertCtrl: AlertController,public http : HttpClient) {
    this.adminService.routing_history.push('/product-details');
  }

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
  postData;
  add_to_cart(content: any,title: any,price: any,imageSource: any)
  {
    this.postData={'email':this.adminService.id_val, 'cart' : {"content": content, "title": title,"price":price, "imageSource":imageSource}}
    this.http.post("http://127.0.0.1:8000/men/",this.postData).subscribe((res: any) => {});
  }
  ngOnInit() {
  }

}

