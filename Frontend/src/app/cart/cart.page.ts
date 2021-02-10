import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  postData:any
  coupon=""
  static temp='';
  CartTotal=0;
  cardContent:any[] = [ ];
  discount=0;

  constructor(public adminService: AdminService, private http: HttpClient,public router: Router,public alertCtrl: AlertController){
    this.postData = {"email": this.adminService.id_val};
    http.post("http://127.0.0.1:8000/cart/",this.postData).subscribe((res: any) => {
      for (let card of res.cart){
        this.cardContent.push({
          content: card.content,
          title: card.title,
          price: card.price
        });
      }

      this.CartTotal=res['price'];
      if(CartPage.temp=='true' )
      this.discount=(10*this.CartTotal)/100
    });}


  final_price(){
    return this.CartTotal-this.discount;
  }


  coupon_code(){
    this.postData = {"email": this.adminService.id_val, "code": this.coupon};
    this.http.post("http://127.0.0.1:8000/cart/",this.postData).subscribe((res: any) => {
      // console.log(res);
      if(res['response']=="true")
        this.coupon_success();
        else
        this.coupon_failure();
    })}


  async coupon_success() {
    CartPage.temp='true';
    this.discount=(10*this.CartTotal)/100;
    const alert = await this.alertCtrl.create({
      header: 'Congratulations!',
      message: 'Coupon Code Applied',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);}


    async coupon_failure() {
      const alert = await this.alertCtrl.create({
        header: 'Oops!',
        message: 'Invalid Coupon Code ',
        buttons: ['OK']
      });
      await alert.present();
      const result = await alert.onDidDismiss();
      console.log(result);}

  delete(title) {
    this.postData = {"email": this.adminService.id_val, "title": title};
    this.http.post("http://127.0.0.1:8000/cart/",this.postData).subscribe((res: any) => {
      this.CartTotal=res['price'];
      this.final_price();
      if(CartPage.temp=='true' )
      this.discount=(10*this.CartTotal)/100;
      this.cardContent=[];
      for (let card of res.cart){
        this.cardContent.push({
          "content": card['content'],
          "title": card['title'],
          "price": card['price']
        }); }})}

    ngOnInit() {}

  }


