import { Component, inject } from '@angular/core';
import { AuthModalComponent } from '../../auth/auth-modal/auth-modal.component';
import { ModalService } from '../../core/modal.service';

@Component({
  imports: [AuthModalComponent],
  selector: 'app-welcome',
  template: `
    <header class="header-container">
                <div class="header-content">
                <a href="/" class="logo-link">
                    <img src="logo.png" alt="Libre Logo" class="logo-img">
                </a>
                
                <div class="actions">
                    <button class="btn secondary-btn" (click)="authModalService.openModal('register')">Join us</button> 
                    <button class="btn primary-btn" (click)="authModalService.openModal('login')">Login</button>
                </div>
                </div>
    </header>
    <section class="welcome-section">
      <div class="welcome-content-wrapper">
          <div class="content-area">
            <p class="h1-title headline-line">Share Thoughts</p>
            <p class="h1-title headline-line">Shape Minds</p>
            
            <p class="tagline">
              A platform to write, read, and inspire minds with your ideas.
            </p>
            
            <button class="btn primary-btn start-reading-btn" (click)="authModalService.openModal('login')">
              Start reading
            </button>
          </div>
          
      </div>
      
    </section>
    <app-auth-modal />
  `,
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
    public authModalService = inject(ModalService);

  
    
}
