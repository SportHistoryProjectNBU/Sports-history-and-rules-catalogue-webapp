import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {RoutingModule} from './routing.config';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginRegisterService} from './register/login-register.service';
import {HttpModule} from '@angular/http';
import {GameService} from './home/gameService';
import { LoginComponent } from './login/login.component';
import {RegisterListener} from './listeners/registerListener';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [LoginRegisterService, GameService, RegisterListener],
  bootstrap: [AppComponent]
})
export class AppModule { }
