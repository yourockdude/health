import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { DocumentsComponent } from '../documents/documents.component';
import { ProfileComponent } from '../profile/profile.component';
import { ClientsComponent } from '../clients/clients.component';

import { AuthGuard } from '../shared/services/auth-guard.service';
import { RoleGuard } from '../shared/services/role-guard.service';
import { ProfileGuard } from '../shared/services/profile-guard.service';

const routes: Routes = [
    {
        path: 'sidenav',
        component: SidenavComponent,
        canActivate: [ProfileGuard],
        children: [
            {
                path: '',
                component: ScheduleComponent,
                pathMatch: 'full',
                outlet: 'sidebar',
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
                outlet: 'sidebar',
            },
            {
                path: 'documents',
                component: DocumentsComponent,
                canActivate: [AuthGuard],
                outlet: 'sidebar',
            },
            {
                path: 'profile/:id',
                component: ProfileComponent,
                canActivate: [AuthGuard],
                outlet: 'sidebar',
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
                outlet: 'sidebar',
            },
            {
                path: 'clients',
                component: ClientsComponent,
                outlet: 'sidebar',
                canActivate: [AuthGuard],
                // canActivate: [RoleGuard],
                data: { roles: ['admin'] },
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SidenavRoutingModule { }

export const routedComponents = [SidenavComponent];
