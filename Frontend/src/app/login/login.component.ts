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

  constructor(public adminService: AdminService,  public http : HttpClient ,public router: Router,public alertCtrl: AlertController ){
    this.adminService.routing_history.push['/login'];
    console.log(this.adminService.routing_history)
  }

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
    console.log(this.adminService.routing_history)
    var nav=this.adminService.routing_history[ this.adminService.routing_history.length-1];
    this.router.navigate([nav]);
    new HeaderComponent(this.adminService, this.http, this.alertCtrl).f4();
  }

  f2(){
    this.adminService.id_val = this.email
    this.adminService.admin=true;
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
