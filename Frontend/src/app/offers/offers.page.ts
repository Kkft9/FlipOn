import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel'
import { AlertController } from '@ionic/angular';
import { AdminService } from '../admin/service.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel;

  constructor(public alertCtrl: AlertController,public adminService: AdminService,  public router: Router,public http : HttpClient ){
    this.adminService.routing_history.push('/offers')
  const postData = {'email' : this.adminService.id_val }
  this.http.post("http://127.0.0.1:8000/offers/" , postData).subscribe(data =>{
  if(data["discount"]>0){
  this.showDone(data["discount"]);
  this.check_and_run=true;}})}

  check_and_run=false;
  seed = [0,1,2,0,3,4,5,6]
  idToLandOn: any;
  items: any[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER
  ngOnInit(){
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['red', 'blue','yellow', 'orange']
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value % 4],
      text: `${value}%`,
      id: value,
      textFillStyle: 'black',
      textFontSize: '25'
    }))
  }

  before() {}

  async spin(prize: any) {
    this.idToLandOn = prize
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  after() {
    const postData = {'email' : this.adminService.id_val,"discount": this.idToLandOn }
    if(this.idToLandOn == 0) this.showSorry();
    else this.showAfter();
    this.http.post("http://127.0.0.1:8000/offers/" , postData).subscribe(data =>{
    })
  }
    async showAfter() {
      const alert = await this.alertCtrl.create({
        header: "You have just been bamboozled!!",
        message: "Congratulations, you just won a discount of " +this.idToLandOn+ "%",
        buttons: ['OK']
      });
    
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);

    if(this.adminService.id_val=='')
    this.router.navigate(['/login']);
  }
  
  async showDone(percent) {
    const alert = await this.alertCtrl.create({
      header: "Don't be too Greedy!!",
      message: "You have already won a discount of " +percent+ "%",
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    // console.log(result);
    console.log('result');
  }

  async showSorry() {
    const alert = await this.alertCtrl.create({
      header: "Unlucky!!",
      message: "Not lucky enough :(",
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    // console.log(result);
    console.log('result');
  }
}
