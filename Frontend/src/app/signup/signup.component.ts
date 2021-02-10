import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name = "";
  email = "";
  password = "";
  number = "";
  userData: any;
  postData = {};
  userDetails : any;

  constructor(public adminService: AdminService, private http : HttpClient, public router: Router, public alertCtrl: AlertController) { }

  ngOnInit(): void {
  }

  signup(){
    this.postData = {
      'email' : this.email ,
      'name' : this.name ,
      'number' : this.number,
      'password' : this.password,
      'cart':[],
      'price':0
    }

    this.http.post("http://127.0.0.1:8000/signup/" , this.postData).subscribe(data =>{
      // console.log(data);
      this.userData = data;
      if(this.userData['user'] == 'Already Exists') {
        console.log("Email already registered!");
        this.showAlert();

        this.router.navigate(['/login']);

      }
      else {
        this.userRegistered();
        console.log("User registered!");

        this.f2();

        this.router.navigate(['/home']);
      }
    })
  }

  f2(){
    this.adminService.id_val = this.email;
    console.log(this.name);
    this.adminService.admin=true;
    this.adminService.add_cart=false;
    this.adminService.add_cart2=false;
    this.adminService.add_cart3=false;
     new HeaderComponent(this.adminService, this.http).f4();
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Email already registered!',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async userRegistered() {
    const alert = await this.alertCtrl.create({
      header: 'Congratulations',
      message: 'User registered successfully!',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

}
