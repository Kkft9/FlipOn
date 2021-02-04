import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(public adminService: AdminService) { }


  ngOnInit(): void {
  }

}
