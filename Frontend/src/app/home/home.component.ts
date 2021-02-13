import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin/service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
  }

  cardContent:any[] = [ ];

  constructor(private http: HttpClient,public adminService: AdminService,){
    this.adminService.routing_history.push('/home');
    http.get('https://www.autonise.com/api/users/getCatalog').subscribe((res: any) => {
      // console.log(res);
      for (let catalogI of res.catalog){
        this.cardContent.push({
          conten: catalogI.description,
          title: catalogI.title,
          imageSource: 'https://www.autonise.com' + catalogI.icon,
        });
      }

    });
}
}
