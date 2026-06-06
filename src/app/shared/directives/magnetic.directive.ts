import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    // Calculate distance from center of element
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    
    // Quick transition for smooth tracking
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
    // Move element 30% of the distance towards the cursor
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translate(${x * 0.3}px, ${y * 0.3}px)`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Smooth reset
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate(0px, 0px)');
  }
}
