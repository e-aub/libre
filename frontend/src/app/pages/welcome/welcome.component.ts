import { Component } from '@angular/core';

@Component({
//   standalone: true,
  selector: 'app-welcome',
  template: `
    <section class="welcome-section">
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
      
      <div class="image-area">
        <img src="assets/typewriter.png" alt="Creative writing on a typewriter" class="main-graphic">
      </div> 
    </section>
  `,
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
    
}