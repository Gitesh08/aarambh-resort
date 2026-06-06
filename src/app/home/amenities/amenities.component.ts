import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.css'
})
export class AmenitiesComponent {}
