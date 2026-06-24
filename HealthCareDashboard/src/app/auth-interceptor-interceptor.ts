import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment.dev';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.startsWith(environment.apiurl)) {

    const token = btoa(`${environment.Username}:${environment.Password}`);

    req = req.clone({
      setHeaders: { Authorization: `Basic ${token}` }

    });
  }

  return next(req);
};
