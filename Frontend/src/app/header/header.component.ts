import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links = [
    {link: '/men', title: 'Men'},
    {link: '/men', title: 'Women'},
    {link: '/men', title: 'Watches'},
    {link: '/men', title: 'Offers'},

  ];

  get staticname() {
    return HeaderComponent.namei;
  }


 static namei='';

  postData:any
  number=""
  userDetails : any;
   constructor(public adminService: AdminService,  private http : HttpClient  ) {}


   f1()
  {
    this.adminService.admin=true;

  }

  f2(){
    this.adminService.admin=false;
  }

  f3()
   {
    this.adminService.add_cart2=true;
    this.adminService.add_cart=false
    this.adminService.add_cart3=false
    }


    f4()
    {

      this.adminService.add_cart2=false;
      this.adminService.add_cart=false
      this.adminService.add_cart3=false
      console.log('in1');
      this.http.get("http://127.0.0.1:8000/login/").subscribe(data =>{
      this.userDetails = data;
      console.log('in2');
      HeaderComponent.namei=this.userDetails['details'][this.adminService.id_val]['name'];
      console.log('in3');
      // this.name= this.userDetails['details'][this.adminService.name_val]['name'];
      // console.log(this.name);

    }
       )
  }

  ngOnInit(): void {

  }


}
