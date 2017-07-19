import { NgModule } from '@angular/core';
import { IntermediateComponent } from './intermediate.component';
import { IntermediateRoutingModule } from './intermediate-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [IntermediateRoutingModule, SharedModule],
    exports: [],
    declarations: [IntermediateComponent],
    providers: [],
})
export class IntermediateModule { }
