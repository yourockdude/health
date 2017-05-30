import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FacebookModule } from 'ngx-facebook';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { environment } from '../../environments/environment';

const providers = {
    'google': {
        'clientId': environment.googleClientId
    },
};

@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule,
        FacebookModule.forRoot(),
        Angular2SocialLoginModule,
    ],
    exports: [],
    declarations: [
        AuthComponent
    ],
    providers: [],
})
export class AuthModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
