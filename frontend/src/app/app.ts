import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, WelcomeComponent],
  template : `
    <app-header/>
    <app-welcome/>
  `,
})
export class App {
  protected readonly title = signal('frontend');
}
