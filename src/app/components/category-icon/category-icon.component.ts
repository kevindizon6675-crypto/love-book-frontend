import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="icon-wrapper" [style.color]="getColor()">
      <svg [attr.width]="size" [attr.height]="size" [attr.viewBox]="'0 0 24 24'" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
        <ng-container [ngSwitch]="iconName">
          <!-- User icon for About Me -->
          <g *ngSwitchCase="'user'">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </g>
          
          <!-- Heart icon for Favorites -->
          <g *ngSwitchCase="'heart'">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </g>
          
          <!-- Sparkles icon for Interests -->
          <g *ngSwitchCase="'sparkles'">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="M5 3v4"/>
            <path d="M19 17v4"/>
            <path d="M3 5h4"/>
            <path d="M17 19h4"/>
          </g>
          
          <!-- Smile icon for Personality -->
          <g *ngSwitchCase="'smile'">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" x2="9.01" y1="9" y2="9"/>
            <line x1="15" x2="15.01" y1="9" y2="9"/>
          </g>
          
          <!-- Heart Handshake icon for Love -->
          <g *ngSwitchCase="'heart-handshake'">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
            <path d="m18 15-2-2"/>
            <path d="m15 18-2-2"/>
          </g>
          
          <!-- Users icon for About Us -->
          <g *ngSwitchCase="'users'">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </g>
          
          <!-- Cloud icon for Dreams -->
          <g *ngSwitchCase="'cloud'">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </g>
          
          <!-- Gamepad icon for Random Questions -->
          <g *ngSwitchCase="'gamepad'">
            <line x1="6" x2="10" y1="12" y2="12"/>
            <line x1="8" x2="8" y1="10" y2="14"/>
            <line x1="15" x2="15.01" y1="13" y2="13"/>
            <line x1="18" x2="18.01" y1="11" y2="11"/>
            <rect width="20" height="12" x="2" y="6" rx="2"/>
          </g>
          
          <!-- Message Circle icon for Messages for Kevs-->
          <g *ngSwitchCase="'message-circle'">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
          </g>
        </ng-container>
      </svg>
    </div>
  `,
  styles: [`
    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
    }
    
    svg {
      transition: transform 0.2s ease;
    }
  `]
})
export class CategoryIconComponent {
  @Input() iconName: string = 'user';
  @Input() size: number = 64;

  get strokeWidth(): number {
    return this.size <= 24 ? 2 : 2;
  }

  getColor(): string {
    const colors: {[key: string]: string} = {
      'user': '#D6336C',           // About Me - primary
      'heart': '#E85C8A',          // Favorites - pink
      'sparkles': '#F2A1BC',       // Interests - light pink
      'smile': '#A855F7',          // Personality - purple
      'heart-handshake': '#EC4899', // Love - rose
      'users': '#F97316',          // About Us - orange
      'cloud': '#8B5CF6',          // Dreams - violet
      'gamepad': '#10B981',        // Random Questions - green
      'message-circle': '#F59E0B'  // Messages for Kevs - amber
    };
    return colors[this.iconName] || '#D6336C';
  }
}

