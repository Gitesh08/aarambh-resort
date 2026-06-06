import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-dining',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './dining.component.html',
  styleUrl: './dining.css'
})
export class DiningComponent {}
