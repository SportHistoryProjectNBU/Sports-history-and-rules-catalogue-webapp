import {Route, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {GamesComponent} from './games/games.component';
import {AuthGuard} from './AuthGuard';
import {AdminComponent} from './admin/admin.component';
import {UsermenuComponent} from './usermenu/usermenu.component';
import {PersonalDataComponent} from './usermenu/personal-data/personal-data.component';
import {SubscribeComponent} from './usermenu/subscribe/subscribe.component';


const routes: Route[] = [
  {path: '', component: HomeComponent , canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'games/:id', component: GamesComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'usermenu', component: UsermenuComponent, canActivate: [AuthGuard], children: [
    {path: '', component: PersonalDataComponent, canActivate: [AuthGuard]},
    {path: 'subscribe', component: SubscribeComponent, canActivate: [AuthGuard]}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {

}
