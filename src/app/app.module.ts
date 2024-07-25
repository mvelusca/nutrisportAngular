import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './ADMINISTRATEUR/admin/admin.component';
import { MembreComponent } from './MEMBRES/membre/membre.component';
import { CoachComponent } from './COACHS/coach/coach.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component'
import { CodeInputModule } from 'angular-code-input';
import { RouterModule } from '@angular/router';
import { DropdownToggleDirective } from './directives/dropdown-toggle.directive';
import { CommonModule } from '@angular/common';
import { AriaLabelledbyDirective } from './directives/aria-labelledby.directive';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({ 
    declarations: [ //les composants
        AppComponent, 
        LoginComponent, 
        RegisterComponent, 
        AdminComponent, 
        MembreComponent, 
        CoachComponent, 
        HomeComponent, 
        ActivateAccountComponent,
        DropdownToggleDirective,
        AriaLabelledbyDirective,
        SidebarComponent,
        LogoutComponent
    ], 
    bootstrap: [ // composant de démarrage
        AppComponent,
    ], 
    imports: [// les modules
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CodeInputModule,
        RouterModule,
        CommonModule
    ], 
    providers: [ //services
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
