import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
  }
  f2()
  {
    this.adminService.admin=true;
  }

}
