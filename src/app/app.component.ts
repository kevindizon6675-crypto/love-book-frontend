import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <!-- Global Floating Tulips Background - MARAMI! -->
    <div class="global-tulips">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-1" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-2" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-3" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-4" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-5" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-6" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-7" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-8" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-9" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-10" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-11" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-12" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-13" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-14" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-15" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-16" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-17" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-18" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-19" alt="">
      <img src="assets/tulip-bouquet.png" class="global-tulip tulip-20" alt="">
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    /* Global Floating Tulips - Present on ALL pages */
    .global-tulips {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .global-tulip {
      position: absolute;
      opacity: 0.08;
      filter: blur(1px);
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    /* Different positions and sizes for variety */
    .tulip-1 {
      width: 180px;
      top: 5%;
      left: 3%;
      animation: floatTulip1 25s infinite;
    }

    .tulip-2 {
      width: 220px;
      top: 15%;
      right: 8%;
      animation: floatTulip2 30s infinite;
    }

    .tulip-3 {
      width: 160px;
      bottom: 20%;
      left: 10%;
      animation: floatTulip3 22s infinite;
    }

    .tulip-4 {
      width: 200px;
      bottom: 8%;
      right: 5%;
      animation: floatTulip1 28s infinite;
    }

    .tulip-5 {
      width: 190px;
      top: 40%;
      right: 2%;
      animation: floatTulip2 26s infinite;
    }

    .tulip-6 {
      width: 170px;
      top: 60%;
      left: 5%;
      animation: floatTulip3 24s infinite;
    }

    .tulip-7 {
      width: 210px;
      top: 25%;
      left: 50%;
      animation: floatTulip1 27s infinite;
    }

    .tulip-8 {
      width: 150px;
      bottom: 30%;
      right: 15%;
      animation: floatTulip2 23s infinite;
    }

    .tulip-9 {
      width: 185px;
      top: 70%;
      left: 40%;
      animation: floatTulip3 29s infinite;
    }

    .tulip-10 {
      width: 195px;
      bottom: 40%;
      left: 25%;
      animation: floatTulip1 31s infinite;
    }

    .tulip-11 {
      width: 175px;
      top: 12%;
      left: 20%;
      animation: floatTulip2 24s infinite;
    }

    .tulip-12 {
      width: 165px;
      top: 35%;
      right: 25%;
      animation: floatTulip3 26s infinite;
    }

    .tulip-13 {
      width: 180px;
      bottom: 15%;
      right: 30%;
      animation: floatTulip1 29s infinite;
    }

    .tulip-14 {
      width: 155px;
      top: 55%;
      left: 18%;
      animation: floatTulip2 27s infinite;
    }

    .tulip-15 {
      width: 190px;
      bottom: 45%;
      right: 12%;
      animation: floatTulip3 25s infinite;
    }

    .tulip-16 {
      width: 170px;
      top: 8%;
      right: 40%;
      animation: floatTulip1 30s infinite;
    }

    .tulip-17 {
      width: 185px;
      bottom: 25%;
      left: 35%;
      animation: floatTulip2 28s infinite;
    }

    .tulip-18 {
      width: 160px;
      top: 48%;
      left: 8%;
      animation: floatTulip3 32s infinite;
    }

    .tulip-19 {
      width: 175px;
      bottom: 55%;
      right: 8%;
      animation: floatTulip1 26s infinite;
    }

    .tulip-20 {
      width: 165px;
      top: 82%;
      left: 60%;
      animation: floatTulip2 31s infinite;
    }

    /* Floating animations with different patterns */
    @keyframes floatTulip1 {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg);
      }
      25% {
        transform: translateY(-20px) translateX(10px) rotate(5deg);
      }
      50% {
        transform: translateY(-10px) translateX(-5px) rotate(-3deg);
      }
      75% {
        transform: translateY(-25px) translateX(15px) rotate(7deg);
      }
    }

    @keyframes floatTulip2 {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg) scale(1);
      }
      33% {
        transform: translateY(-15px) translateX(-10px) rotate(-5deg) scale(1.05);
      }
      66% {
        transform: translateY(-30px) translateX(8px) rotate(4deg) scale(0.95);
      }
    }

    @keyframes floatTulip3 {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg);
      }
      20% {
        transform: translateY(-10px) translateX(12px) rotate(6deg);
      }
      40% {
        transform: translateY(-25px) translateX(-8px) rotate(-4deg);
      }
      60% {
        transform: translateY(-15px) translateX(10px) rotate(8deg);
      }
      80% {
        transform: translateY(-20px) translateX(-5px) rotate(-2deg);
      }
    }

    /* Mobile: Show MORE tulips and increase opacity for visibility */
    @media (max-width: 767px) {
      .global-tulip {
        opacity: 0.12; /* Mas visible sa mobile */
      }

      /* Keep all 20 tulips but adjust sizes */
      .tulip-1, .tulip-2, .tulip-3, .tulip-4, .tulip-5,
      .tulip-6, .tulip-7, .tulip-8, .tulip-9, .tulip-10 {
        width: 140px;
      }

      .tulip-11, .tulip-12, .tulip-13, .tulip-14, .tulip-15,
      .tulip-16, .tulip-17, .tulip-18, .tulip-19, .tulip-20 {
        width: 130px;
      }
    }

    /* Tablet: Medium tulips */
    @media (min-width: 768px) and (max-width: 1023px) {
      .tulip-1, .tulip-2, .tulip-3, .tulip-4, .tulip-5 {
        width: 150px;
      }
      .tulip-6, .tulip-7, .tulip-8, .tulip-9, .tulip-10 {
        width: 140px;
      }
    }

    /* Ensure content appears above tulips */
    :host ::ng-deep router-outlet + * {
      position: relative;
      z-index: 1;
    }
  `]
})
export class AppComponent {
  title = 'Our Little Love Book';
}
