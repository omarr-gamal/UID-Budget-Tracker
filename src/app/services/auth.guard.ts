import {inject} from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  return auth.user$.pipe(
    take(1),
    map(user => !!user),
    tap(loggedIn => {
      if (!loggedIn) {
        router.navigate(['/login']);
      }
    })
  )
};
