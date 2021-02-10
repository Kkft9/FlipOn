import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';
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

 postData:any
  // public adminService: any;
  // public alertCtrl;
  // constructor(alertCtrl, adminService) {
  //   this.adminService=adminService;
  //   this.alertCtrl=alertCtrl
  // }
  constructor(public adminService: AdminService, private http: HttpClient, public alertCtrl: AlertController){}

  add_to_cart(cont,tit,price)
  {
    this.postData={'email':this.adminService.id_val, 'cart' : {"content": cont, "title": tit,"price":price}}
    this.http.post("http://127.0.0.1:8000/men/",this.postData).subscribe((res: any) => {});
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
