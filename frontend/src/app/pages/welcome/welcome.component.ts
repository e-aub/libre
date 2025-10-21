import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-welcome',
  template: `
    <!-- The section uses flexbox to center its inner content -->
    <section class="welcome-section">
      
      <!-- This wrapper defines the max-width and ensures content is a single block -->
      <div class="welcome-content-wrapper">
          
          <div class="content-area">
            <p class="h1-title headline-line">Share Thoughts</p>
            <p class="h1-title headline-line">Shape Minds</p>
            
            <p class="tagline">
              A platform to write, read, and inspire minds with your ideas.
            </p>
            
            <button class="btn primary-btn start-reading-btn">
              Start reading
            </button>
          </div>
          
      </div>
      
    </section>
  `,
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {}
