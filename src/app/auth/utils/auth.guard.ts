import { inject } from "@angular/core"
import { AuthService } from "../data-access/auth.service"
import { catchError, map, of, switchMap, take } from "rxjs";
import { Router } from "@angular/router";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.autoLogin().pipe(
    take(1),
    switchMap(_ => of(true)),
    catchError(_ => of(false)),
    map(res => {
      const isAuth = res ? true : false;
      if(isAuth) {
        return true;
      }
      else {
        return router.createUrlTree(['auth', 'login']);
      }
    }
  ));
}