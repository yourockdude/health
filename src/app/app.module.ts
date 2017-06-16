import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { ActivatedRouteSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { ScheduleModule } from './schedule/schedule.module';
import { PricesModule } from './prices/prices.module';
import { AuthModule } from './auth/auth.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { DocumentsModule } from './documents/documents.module';
import { ProfileModule } from './profile/profile.module';
import { ClientsModule } from './clients/clients.module';
import { ClientPageModule } from './client-page/client-page.module';
import { AuthService } from './shared/services/auth.service';
import { RoleGuard } from './shared/services/role-guard.service';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(
  http: Http,
  options: RequestOptions
) {
  return new AuthHttp(
    new AuthConfig({ noTokenScheme: true }),
    http,
    options
  );
}

@NgModule({
  declarations: [
    AppComponent,
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
    ProfileModule,
    ClientsModule,
    ClientPageModule,
    AuthModule,
  ],
  providers: [
    AuthService,
    RoleGuard,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
