import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistPageRoutingModule } from './order-hist-routing.module';

import { OrderHistPage } from './order-hist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHistPageRoutingModule
  ],
  declarations: [OrderHistPage]
})
export class OrderHistPageModule {}
