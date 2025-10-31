import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth-service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
      <router-outlet></router-outlet>
    `,
})
export class App {
  authService = inject(AuthService);
}
