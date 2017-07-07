import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [
        FooterComponent
    ],
    declarations: [
        FooterComponent
    ],
    providers: [],
})
export class FooterModule { }
