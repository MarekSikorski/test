import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
    const router = inject(Router);

    return inject(AuthService).user.pipe(
        map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return router.createUrlTree(['auth']);
        })
    );
};
