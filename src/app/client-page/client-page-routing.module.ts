import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPageComponent } from './client-page.component';

const routes: Routes = [
    { path: 'clients/:id', component: ClientPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientPageRoutingModule { }

export const routedComponents = [ClientPageComponent];
