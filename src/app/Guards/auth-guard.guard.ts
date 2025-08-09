import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { session } from '../Utils/session';
import { AccountService } from '../Services/Account/account.service';



export const authGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const router: Router = inject(Router);
    const accountService = inject(AccountService)

    const protectedRoutes: string[] = ['/user'];
     return protectedRoutes.includes(state.url) && !accountService.getSession() 
      ? router.navigate([''])
      : true;
  };