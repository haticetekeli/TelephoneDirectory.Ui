import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  let token = '';

  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      token = storedToken;
    }
  }
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token)
  });
  return next(clonedReq);
};

