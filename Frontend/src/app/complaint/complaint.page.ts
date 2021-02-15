import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminService } from '../admin/service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.page.html',
  styleUrls: ['./complaint.page.scss'],
})
export class ComplaintPage implements OnInit {

  constructor(public adminService: AdminService, public alertCtrl: AlertController,public router: Router) {  this.adminService.routing_history.push['/complaint'];}

  async alert() {

    const alert = await this.alertCtrl.create({
      header: 'Complaint registered successfully',
      message: 'We will reach out to you soon',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
    this.router.navigate(['/home']);
  }
  ngOnInit() {

  }

}
