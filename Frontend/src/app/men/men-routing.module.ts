import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenPage } from './men.page';

const routes: Routes = [
  {
    path: '',
    component: MenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenPageRoutingModule {}
