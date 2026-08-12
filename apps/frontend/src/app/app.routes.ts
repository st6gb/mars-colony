import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./registration/registration.component').then(
        (m) => m.RegistrationComponent
      ),
  },
];
