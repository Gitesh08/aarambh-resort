import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'in-view');
          // Optional: Unobserve after revealing to prevent repeated animations on scroll up
          // this.observer?.unobserve(entry.target); 
        } else {
          // If we want it to animate every time it scrolls into view, remove the class when out of view
          this.renderer.removeClass(this.el.nativeElement, 'in-view');
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: '0px 0px -50px 0px' // Slightly before it hits the bottom
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
