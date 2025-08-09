import { Routes } from '@angular/router';
import { UserComponent } from './Components/User/user.component';
import { Component } from '@angular/core';
import { LoginComponent } from './Pages/Auth/login.component';
import { LayoutComponent } from './Pages/Layout/layout.component';
import { DashboardComponent } from './Pages/Dashboard/dashboard.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { authGuard } from './Guards/auth-guard.guard';



export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full', },
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: ' user', component: UserComponent, },

    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'user',
                component: UserComponent,
                canActivate: [authGuard]
            }
        ]
    },
];