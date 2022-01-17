import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminService } from './admin/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  response = null;

  // constructor(public adminService: AdminService, private http : HttpClient) {
  //   this.http.get('http://65.1.28.10/api/hello/' , {responseType: 'text'}).subscribe((res: any) => {
  //     this.response = res;
  //   })
  //  }
   constructor(public adminService: AdminService) { }
}
