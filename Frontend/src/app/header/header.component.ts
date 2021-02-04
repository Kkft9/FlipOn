import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/service.service';

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

  constructor(public adminService: AdminService) { }

  f1()
  {console.log('ssd')
    this.adminService.admin=true;
  }

  f2()
  {console.log('s')
    this.adminService.admin=false;
    this.adminService.name_val='';
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
    }
  ngOnInit(): void {
  }

}
