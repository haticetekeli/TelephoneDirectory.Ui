import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Sadece browser'da çalışsın
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (!token) {
      router.navigate(['/login']); // login sayfasına at
      return false;
    }
    return true;
  }

  // SSR tarafında da false dönelim, login'e atsın
  router.navigate(['/login']);
  return false;
};
