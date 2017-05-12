import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricesComponent } from './prices.component';

const routes: Routes = [
  { path: 'prices', component: PricesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricesRoutingModule { }

export const routedComponents = [PricesComponent];
