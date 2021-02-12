import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin/service.service';
import { HeaderComponent } from '../header/header.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  name=""
  postData:any
  number=""
  userDetails : any;
   constructor(public adminService: AdminService,  private http : HttpClient, public alertCtrl: AlertController  ) {
    this.http.get("http://127.0.0.1:8000/login/").subscribe(data =>{
      this.userDetails = data;
      this.name= this.userDetails[adminService.id_val]['name'];
      this.number= this.userDetails[adminService.id_val]['number'];
      console.log(this.name);
      console.log(this.number);
    })
  }

  profile_update() {
    // console.log(this.email + "  " + this.password);
    this.postData = {
      'email' : this.adminService.id_val ,
      'name' : this.name ,
      'number' : this.number ,
    }

    this.http.post("http://127.0.0.1:8000/profile/" , this.postData).subscribe(data =>{
      // console.log(data);
      new HeaderComponent(this.adminService, this.http, this.alertCtrl).f4();
    })
  }


  ngOnInit(): void {
  }

}
