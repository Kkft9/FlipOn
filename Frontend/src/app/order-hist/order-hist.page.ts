import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin/service.service';

@Component({
  selector: 'app-order-hist',
  templateUrl: './order-hist.page.html',
  styleUrls: ['./order-hist.page.scss'],
})
export class OrderHistPage implements OnInit {
  postData:any
  cardContent:any[] = [ ];


  constructor(public adminService: AdminService, private http: HttpClient){
    this.adminService.routing_history.push('/order-hist');
    this.postData = {"email": this.adminService.id_val};
    http.post("http://127.0.0.1:8000/order-history/",this.postData).subscribe((res: any) => {
      for (let cart of res.order_history){
        this.cardContent.push({
          content: cart.content,
          title: cart.title,
          price: cart.price,
          imageSource: cart.imageSource,
        })
  }})}

  ngOnInit() {
  }

}
