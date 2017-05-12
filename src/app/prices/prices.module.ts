import { NgModule } from '@angular/core';

import { PricesComponent } from './prices.component';
import { PricesRoutingModule } from './prices-routing.module';

@NgModule({
    imports: [PricesRoutingModule],
    exports: [],
    declarations: [PricesComponent],
    providers: [],
})
export class PricesModule { }
