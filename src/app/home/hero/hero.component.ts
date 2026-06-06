import {
  Component, inject, AfterViewInit, ElementRef,
  ViewChild, PLATFORM_ID, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { UiStateService } from '../../core/services/ui-state.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private uiState = inject(UiStateService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('heroSection')  heroSectionRef!:  ElementRef<HTMLElement>;
  @ViewChild('heroImg')      heroImgRef!:      ElementRef<HTMLImageElement>;
  @ViewChild('heroTitle')    heroTitleRef!:    ElementRef<HTMLElement>;
  @ViewChild('heroSubtitle') heroSubtitleRef!: ElementRef<HTMLElement>;
  @ViewChild('heroBtn')      heroBtnRef!:      ElementRef<HTMLElement>;
  @ViewChild('scrollArrow')  scrollArrowRef!:  ElementRef<HTMLElement>;

  private timeline: gsap.core.Timeline | null = null;

  bookRoom() {
    this.uiState.openBookingModal();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const section  = this.heroSectionRef.nativeElement;
    const img      = this.heroImgRef.nativeElement;
    const title    = this.heroTitleRef.nativeElement;
    const subtitle = this.heroSubtitleRef.nativeElement;
    const btn      = this.heroBtnRef.nativeElement;
    const arrow    = this.scrollArrowRef.nativeElement;

    // ── Universal Pinned scroll-driven cinematic reveal ──
    // Initial states
    gsap.set(img, { scale: 1.05, transformOrigin: 'center center' });
    gsap.set([subtitle, btn], { opacity: 0, y: 30 });
    gsap.set(title, { opacity: 1, y: 0 });

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=250%', // Extended scroll distance to allow for fade out
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        pinReparent: true, // Crucial for mobile browsers to prevent transform context ghosting
        invalidateOnRefresh: true,
      }
    });

    // Beat 0 (0→15%): Instantly fade out the scroll arrow
    this.timeline.to(arrow, { opacity: 0, duration: 0.15 }, 0);

    // Beat 1 (0→30%): Image zooms in
    this.timeline.to(img, { scale: 1.4, ease: 'none', duration: 0.30 }, 0);

    // Beat 2 (30→60%): Subtitle reveals + more zoom
    this.timeline.to(img,      { scale: 1.7, ease: 'none',     duration: 0.30 }, 0.30);
    this.timeline.to(subtitle, { opacity: 1,  y: 0, ease: 'power2.out', duration: 0.25 }, 0.35);

    // Beat 3 (60→85%): Button reveals + deep zoom
    this.timeline.to(img, { scale: 2.1, ease: 'none',     duration: 0.25 }, 0.60);
    this.timeline.to(btn, { opacity: 1,  y: 0, ease: 'power2.out', duration: 0.20 }, 0.65);

    // Beat 4 (85→100%): Fade out text as we enter the dark rooms section
    this.timeline.to(img, { scale: 2.2, ease: 'none', duration: 0.15 }, 0.85);
    this.timeline.to([title, subtitle, btn], { opacity: 0, y: -20, ease: 'power1.inOut', duration: 0.15 }, 0.85);
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.scrollTrigger?.kill();
      this.timeline.kill();
    }
  }
}
