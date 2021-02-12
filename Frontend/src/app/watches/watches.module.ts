import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent} from '../card/card.component'
import { IonicModule } from '@ionic/angular';

import { WatchesPageRoutingModule } from './watches-routing.module';

import { WatchesPage } from './watches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchesPageRoutingModule
  ],
  declarations: [WatchesPage,CardComponent]
})
export class WatchesPageModule {}
