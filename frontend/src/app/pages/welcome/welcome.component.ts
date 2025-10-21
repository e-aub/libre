import { Component, inject } from '@angular/core';
import { AuthModalComponent } from '../../auth/auth-modal/auth-modal.component';
import { ModalService } from '../../core/modal.service';

@Component({
  imports: [],
  selector: 'app-welcome',
  template: `
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
  `,
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
    public authModalService = inject(ModalService);
    
}
