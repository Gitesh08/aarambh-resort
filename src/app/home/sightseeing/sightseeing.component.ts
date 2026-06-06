import {
  Component, AfterViewInit, ElementRef,
  PLATFORM_ID, inject, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-sightseeing',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './sightseeing.component.html',
  styleUrl: './sightseeing.css'
})
export class SightseeingComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  private mm = gsap.matchMedia();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const section = this.el.nativeElement.querySelector('.sight-scroll-container');
    const track = this.el.nativeElement.querySelector('.sight-track');

    if (section && track) {
      this.mm.add('all', () => {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        // Robust fix for layout shifts (e.g., images loading above) causing incorrect pin positions
        const ro = new ResizeObserver(() => ScrollTrigger.refresh());
        ro.observe(document.body);

        return () => {
          ro.disconnect();
        };
      });
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.mm.revert();
  }
}
