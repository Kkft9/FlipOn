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

  constructor(public adminService: AdminService) { }
}
