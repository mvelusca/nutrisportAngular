import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './ADMINISTRATEUR/admin/admin.component';
import { CoachComponent } from './COACHS/coach/coach.component';
import { MembreComponent } from './MEMBRES/membre/membre.component';
import { HomeComponent } from './home/home.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { LogoutComponent } from './logout/logout.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'register', component: RegisterComponent }, // Route pour l'inscription
  { path: 'admin', component: AdminComponent },
  { path: 'coach', component: CoachComponent },
  { path: 'member', component: MembreComponent },
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
]; //liste des routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
