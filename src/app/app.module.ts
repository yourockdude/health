import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { ScheduleModule } from './schedule/schedule.module';
import { PricesModule } from './prices/prices.module';
import { AuthModule } from './auth/auth.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { DocumentsModule } from './documents/documents.module';
import { RecordingModule } from './recording/recording.module';
import { ProfileModule } from './profile/profile.module';
import { ClientsModule } from './clients/clients.module';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    PricesModule,
    SidenavModule,
    DocumentsModule,
    ScheduleModule,
    RecordingModule,
    ProfileModule,
    ClientsModule,
    AuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
