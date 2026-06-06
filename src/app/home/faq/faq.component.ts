import { Component, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.css'
})
export class FaqComponent {
  openIndex = signal<number | null>(null);

  toggle(index: number) {
    if (this.openIndex() === index) {
      this.openIndex.set(null);
    } else {
      this.openIndex.set(index);
    }
  }
}
