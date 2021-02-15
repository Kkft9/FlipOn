import { AdminService } from '../admin/service.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import  { ProductDetailsPage} from '../product-details/product-details.page'
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


 static searchContent:any[] = [ ];
 postData
  // static search: any;

  constructor(public adminService: AdminService,public http : HttpClient,public alertCtrl: AlertController)
   { this.adminService.routing_history.push('/search');}

    get staticname() {
      return SearchPage.searchContent;
    }
    add_to_cart(content: any,title: any,price: any,imageSource: any)
  {
    this.postData={'email':this.adminService.id_val, 'cart' : {"content": content, "title": title,"price":price, "imageSource":imageSource}}
    this.http.post("http://127.0.0.1:8000/men/",this.postData).subscribe((res: any) => {});
  }

   searche(search_value)
   {
    const postData={'search':search_value}
    this.http.post("http://127.0.0.1:8000/search/" , postData).subscribe(data =>{
      SearchPage.searchContent=data['details'];
      console.log(data['details'])
      if(data['details'].length == 0)
      this.showAlert()

   })
  }
  async showAlert_added() {
    const alert = await this.alertCtrl.create({
      header: 'Congratulations',
      message: 'Your item has been added to the cart',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  search( search_value)
 {

   new ProductDetailsPage(this.adminService, this.alertCtrl,this.http).searche(search_value);

 }
  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Product Unavailable until database gets feeded by kkft9 and srt24!',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }




  ngOnInit() {
  }

}
