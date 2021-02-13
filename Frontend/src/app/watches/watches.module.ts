import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardPageModule} from '../card/card.module'
import { IonicModule } from '@ionic/angular';

import { WatchesPageRoutingModule } from './watches-routing.module';

import { WatchesPage } from './watches.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchesPageRoutingModule,CardPageModule
  ],
  declarations: [WatchesPage]
})
export class WatchesPageModule {}
