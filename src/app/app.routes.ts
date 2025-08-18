import { Routes } from '@angular/router';
import { UserComponent } from './Components/User/user.component';
import { LoginComponent } from './Pages/Auth/login.component';
import { RegisterComponent } from './Pages/Auth/Register/register.component';
import { AuthGuard } from './Guards/auth-guard.guard';
export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full', },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: ' user', component: UserComponent, },

    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'user',
                component: UserComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
];