import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';
import  { CartPage} from '../cart/cart.page'
import { AlertController } from '@ionic/angular';
import  { SearchPage} from '../search/search.page'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search_value:any;



  links = [
    {link: '/men', title: 'Men'},
    {link: '/women', title: 'Women'},
    {link: '/watches', title: 'Watches'},
    {link: '/offers', title: 'Offers'},

  ];

  search()
  {
    console.log(this.search_value)
    new SearchPage(this.adminService, this.http,this.alertCtrl).searche(this.search_value);
  }

  get staticname() {
    return HeaderComponent.namei;
  }

  static namei='';
  postData:any
  number=""
  userDetails : any;
  constructor(public adminService: AdminService,  private http : HttpClient ,public alertCtrl:AlertController  ) {}


  f1(){
    this.adminService.admin=true;
  }

  f2(){
    this.adminService.admin=false;
    this.adminService.routing_history=[];
    CartPage.temp='false';
    this.adminService.id_val=''
  }

  cart_router()  {
    this.adminService.routing_history.push('/cart')
  }

  f4(){
    console.log(this.adminService.id_val)
      this.http.get("http://127.0.0.1:8000/login/").subscribe(data =>{
      this.userDetails = data;
      HeaderComponent.namei=this.userDetails[this.adminService.id_val]['name'];
      // this.name= this.userDetails['details'][this.adminService.name_val]['name'];
      // console.log(this.name);
    })
  }

  ngOnInit(): void {}
}
