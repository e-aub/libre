import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthModalComponent } from './auth/auth-modal/auth-modal.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, WelcomeComponent, AuthModalComponent],
  template : `
    <app-header/>
    <app-welcome/>
    <app-auth-modal />
  `,
})
export class App {
  protected readonly title = signal('frontend');
}
