import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.css'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutImage') aboutImageRef!: ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const imgHolder = this.aboutImageRef.nativeElement;
    const img = imgHolder.querySelector('img');

    // Subtle parallax zoom effect on the image itself
    if (img) {
      gsap.fromTo(img, 
        { scale: 1.0 }, 
        {
          scale: 1.25,
          ease: 'none',
          scrollTrigger: {
            trigger: imgHolder,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    }
  }
}
