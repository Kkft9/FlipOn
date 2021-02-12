import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  email = "";
  password = "";
  userDetails : any;
  postData = {};
  userData : any;

  constructor(public adminService: AdminService,  public http : HttpClient ,public router: Router,public alertCtrl: AlertController ){}

  ngOnInit(): void {
  }

  login() {
    // console.log(this.email + "  " + this.password);
    this.postData = {
      'email' : this.email ,
      'password' : this.password
    }
    this.http.post("http://127.0.0.1:8000/login/" , this.postData).subscribe(data =>{
      // console.log(data);
      this.userData = data;
      if(this.userData['user'] == 'True') {
        this.navigator_decider();
        this.f2();
      }
      else if(this.userData['user'] == 'New') {
        this.userNew();
        this.router.navigate(['/signup']);
      }
      else {
        this.showAlert();
        console.log("Invalid Id/Password");
      }
    })
  }

  navigator_decider(){
    if(this.adminService.add_cart==true)
    this.router.navigate(['/men']);
    else if(this.adminService.add_cart2==true)
    this.router.navigate(['/cart']);
    else if(this.adminService.add_cart3==true)
    this.router.navigate(['/product-details']);
    else if(this.adminService.add_cart_watch==true)
    this.router.navigate(['/watches']);
    else if(this.adminService.add_cart_women==true)
    this.router.navigate(['/women']);
    else
    this.router.navigate(['/home']);
    new HeaderComponent(this.adminService, this.http, this.alertCtrl).f4();
  }

  f2(){
    this.adminService.id_val = this.email
    this.adminService.admin=true;
    this.adminService.add_cart=false;
    this.adminService.add_cart2=false;
    this.adminService.add_cart3=false;
    this.adminService.add_cart_women=false;
    this.adminService.add_cart_watch=false;

  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'The Id/Password is invalid',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async userNew() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Email not registered',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }
}
