import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tulip-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [attr.width]="size" [attr.height]="size * 1.3" viewBox="0 0 24 32" [attr.fill]="getColor()">
      <path d="M12 28c-0.8 0-1.5-0.7-1.5-1.5V10c0-0.8 0.7-1.5 1.5-1.5s1.5 0.7 1.5 1.5v16.5c0 0.8-0.7 1.5-1.5 1.5z"/>
      <path d="M12 10c-2.5 0-4.5-2-4.5-4.5 0-1.2 0.5-2.3 1.3-3.1C9.5 1.6 10.7 1 12 1s2.5 0.6 3.2 1.4c0.8 0.8 1.3 1.9 1.3 3.1C16.5 8 14.5 10 12 10z"/>
      <ellipse cx="7.5" cy="7" rx="4" ry="6" [attr.fill]="getPetalColor()" opacity="0.85"/>
      <ellipse cx="16.5" cy="7" rx="4" ry="6" [attr.fill]="getPetalColor()" opacity="0.85"/>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class TulipIconComponent {
  @Input() type: string = 'tulip-pink';
  @Input() size: number = 48;

  getColor(): string {
    const colors: {[key: string]: string} = {
      'tulip-pink': '#e91e63',
      'tulip-red': '#d32f2f',
      'tulip-yellow': '#fbc02d',
      'tulip-purple': '#7b1fa2',
      'tulip-rose': '#f06292',
      'tulip-orange': '#ff6f00',
      'tulip-white': '#ec407a',
      'tulip-mixed': '#e91e63'
    };
    return colors[this.type] || '#e91e63';
  }

  getPetalColor(): string {
    const colors: {[key: string]: string} = {
      'tulip-pink': '#c2185b',
      'tulip-red': '#b71c1c',
      'tulip-yellow': '#f9a825',
      'tulip-purple': '#4a148c',
      'tulip-rose': '#ec407a',
      'tulip-orange': '#e65100',
      'tulip-white': '#d81b60',
      'tulip-mixed': '#ad1457'
    };
    return colors[this.type] || '#c2185b';
  }
}
