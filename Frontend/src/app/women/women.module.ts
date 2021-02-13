import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardPageModule} from '../card/card.module'
import { IonicModule } from '@ionic/angular';

import { WomenPageRoutingModule } from './women-routing.module';

import { WomenPage } from './women.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WomenPageRoutingModule,
    CardPageModule
  ],
  declarations: [WomenPage]
})
export class WomenPageModule {}
