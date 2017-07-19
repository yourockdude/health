import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [HomeRoutingModule, SharedModule],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
