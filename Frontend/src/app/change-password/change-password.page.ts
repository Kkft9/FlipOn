import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { AdminService } from '../admin/service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  oldPass : string = "";
  newPass : string = "";
  confirmPass : string = "";
  userDetails : any;
  postData : any;

  constructor(public adminService: AdminService, private http : HttpClient , public router: Router, public alertCtrl: AlertController) {
    this.adminService.routing_history.push('/change-password');
    this.http.get("http://127.0.0.1:8000/login/").subscribe(data =>{
      this.userDetails = data;
    })
   }

  ngOnInit() {
  }

  changePassword() {
    console.log(this.oldPass + "  " + this.newPass + "  " + this.confirmPass);

    if(this.oldPass != this.userDetails[this.adminService.id_val]['password']) {
      this.errorOne();
      return;
    }

    if(this.newPass != this.confirmPass) {
      this.errorTwo();
      return;
    }

    this.postData = {
      'email' : this.adminService.id_val ,
      'password' : this.newPass,
    }
    this.http.post("http://127.0.0.1:8000/profile/" , this.postData).subscribe(data =>{
      // console.log(data);
      new HeaderComponent(this.adminService, this.http, this.alertCtrl).f4();
    })
    this.updateDetails();
    this.router.navigate(['/profile']);
  }

  async errorOne() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Invalid Password',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
  async errorTwo() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: "Passwords don't match!",
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
  async updateDetails() {
    const alert = await this.alertCtrl.create({
      header: 'Congratulations',
      message: 'Password Updated!',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

}
