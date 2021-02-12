import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent} from '../card/card.component'
import { IonicModule } from '@ionic/angular';
import { MenPageRoutingModule } from './men-routing.module';
import { MenPage } from './men.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenPageRoutingModule,

  ],
  declarations: [MenPage,CardComponent]
})
export class MenPageModule {}
