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
import { GamesComponent } from './games/games.component';
import {AuthGuard} from './AuthGuard';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    GamesComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [LoginRegisterService, GameService, RegisterListener, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
