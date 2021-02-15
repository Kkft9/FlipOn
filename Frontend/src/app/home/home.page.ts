import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin/service.service';
import { AlertController } from '@ionic/angular';
import  { ProductDetailsPage} from '../product-details/product-details.page'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {


  ngOnInit(): void {
  }

  cardContent_men:any[] = [ ];
  cardContent_women:any[] = [ ];
  cardContent_watch:any[] = [ ];
  postData:any
  index_arr1: number[] = [0,1,2];
  index_arr2: number[] = [3,4,5];

  constructor(public adminService: AdminService, private http: HttpClient, public alertCtrl: AlertController)
  {
    this.adminService.routing_history.push('/home')
    http.get('http://127.0.0.1:8000/men/').subscribe((res: any) => {
      this.cardContent_men = res['details'];
    });
  
    http.get('http://127.0.0.1:8000/women/').subscribe((res: any) => {
      this.cardContent_women = res['details'];
    });
    http.get('http://127.0.0.1:8000/watch/').subscribe((res: any) => {
      this.cardContent_watch = res['details'];
    });

  }

  search(search_value: any)
 {

   new ProductDetailsPage(this.adminService, this.alertCtrl,this.http).searche(search_value);

 }

 

  add_to_cart_men(content: any,title: any,price: any,imageSource: any)
  {
    this.postData={'email':this.adminService.id_val, 'cart' : {"content": content, "title": title,"price":price, "imageSource":imageSource}}
    this.http.post("http://127.0.0.1:8000/men/",this.postData).subscribe((res: any) => {});
  }
  add_to_cart_women(content: any,title: any,price: any,imageSource: any)
  {
    this.postData={'email':this.adminService.id_val, 'cart' : {"content": content, "title": title,"price":price, "imageSource":imageSource}}
    this.http.post("http://127.0.0.1:8000/women/",this.postData).subscribe((res: any) => {});
  }
  add_to_cart_watch(content: any,title: any,price: any,imageSource: any)
  {
    this.postData={'email':this.adminService.id_val, 'cart' : {"content": content, "title": title,"price":price, "imageSource":imageSource}}
    this.http.post("http://127.0.0.1:8000/watches/",this.postData).subscribe((res: any) => {});
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
}
