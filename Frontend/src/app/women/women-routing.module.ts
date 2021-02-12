import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WomenPage } from './women.page';

const routes: Routes = [
  {
    path: '',
    component: WomenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WomenPageRoutingModule {}
