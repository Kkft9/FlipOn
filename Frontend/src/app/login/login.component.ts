import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'; 
import { AlertController } from '@ionic/angular';

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

  constructor(public adminService: AdminService,  private http : HttpClient ,public router: Router,public alertCtrl: AlertController ) {
    this.http.get("http://127.0.0.1:8000/login/").subscribe(data =>{
      this.userDetails = data;
      // console.log(this.userDetails);
    })
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
        this.router.navigate(['/home']);
        this.f2();
      }
      else if(this.userData['user'] == 'New') {
        this.userNew();
        this.router.navigate(['/signup']);
      }
      else {
        this.showAlert();
        this.router.navigate(['/login']);
        console.log("Invalid Id/Password");
      }
    })
  }

  f2(){
    this.adminService.name_val = this.userDetails['details'][this.email]['name'];
    this.adminService.admin=true;
    this.adminService.add_cart=false;
    this.adminService.add_cart2=false;
    this.adminService.add_cart3=false;
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
