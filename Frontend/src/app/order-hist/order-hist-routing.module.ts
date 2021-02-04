import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHistPage } from './order-hist.page';

const routes: Routes = [
  {
    path: '',
    component: OrderHistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderHistPageRoutingModule {}
