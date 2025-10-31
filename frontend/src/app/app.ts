import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthService } from './auth/auth-service/auth.service';
import { Layout } from "./pages/layout/layout";

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
