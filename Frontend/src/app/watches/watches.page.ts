import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';
import  { ProductDetailsPage} from '../product-details/product-details.page'

@Component({
  selector: 'app-watches',
  templateUrl: './watches.page.html',
  styleUrls: ['./watches.page.scss'],
})
export class WatchesPage implements OnInit {

  cardContent:any[] = [ ];

  f1(){
   this.adminService.add_cart=false;
   this.adminService.add_cart3=false
   this.adminService.add_cart2=false
   this.adminService.add_cart_watch=true
   this.adminService.add_cart_women=false
 }
 search( search_value)
 {

   new ProductDetailsPage(this.adminService, this.alertCtrl,this.http).searche(search_value);

 }

  postData:any

  constructor(public adminService: AdminService, private http: HttpClient, public alertCtrl: AlertController)
  {
    http.get('http://127.0.0.1:8000/watch/').subscribe((res: any) => {
      this.cardContent=res['details'];


    });

  }

  add_to_cart(content,title,price,imageSource)
  {
    this.postData={'email':this.adminService.id_val, 'cart' : {"content": content, "title": title,"price":price, "imageSource":imageSource}}
    this.http.post("http://127.0.0.1:8000/watch/",this.postData).subscribe((res: any) => {});
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
