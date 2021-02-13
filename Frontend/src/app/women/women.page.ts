
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';
import  { ProductDetailsPage} from '../product-details/product-details.page'
@Component({
  selector: 'app-women',
  templateUrl: './women.page.html',
  styleUrls: ['./women.page.scss'],
})
export class WomenPage implements OnInit {
  cardContent:any[] = [ ];

 search( search_value)
 {

   new ProductDetailsPage(this.adminService, this.alertCtrl,this.http).searche(search_value);

 }
  postData:any

  constructor(public adminService: AdminService, private http: HttpClient, public alertCtrl: AlertController)
  {
    this.adminService.routing_history.push('/women');
    console.log(this.adminService.routing_history)
    http.get('http://127.0.0.1:8000/women/').subscribe((res: any) => {
      this.cardContent=res['details'];


    });

  }

  add_to_cart(content,title,price,imageSource)
  {
    this.postData={'email':this.adminService.id_val, 'cart' : {"content": content, "title": title,"price":price, "imageSource":imageSource}}
    this.http.post("http://127.0.0.1:8000/women/",this.postData).subscribe((res: any) => {});
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

  ngOnInit() {
  }

}
