import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';

import { NavbarModule } from './navbar/navbar.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { ErrorMessagesComponent } from './error-message/error-message.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserAnimationsModule,
        NavbarModule,
        Angular2FontawesomeModule,
    ],
    declarations: [
        FooterComponent,
        SearchComponent,
        ErrorMessagesComponent,
        TimeFormatPipe,
        DateTimeFormatPipe,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserAnimationsModule,
        NavbarModule,
        FooterComponent,
        SearchComponent,
        Angular2FontawesomeModule,
        ErrorMessagesComponent,
        TimeFormatPipe,
        DateTimeFormatPipe,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
