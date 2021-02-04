import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
  }
  f2()
  {console.log('ssd')

    this.adminService.admin=true;
    this.adminService.add_cart=false;
    this.adminService.add_cart2=false;
    this.adminService.add_cart3=false;
  }
}
