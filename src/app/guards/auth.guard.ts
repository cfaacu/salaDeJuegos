import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isLoggedIn) {
    console.log("puede pasar");
    return true
  }

  console.log("no puede pasar");
  router.navigate(["/home"]);
  return  false;
};