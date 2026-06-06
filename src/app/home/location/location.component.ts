import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './location.component.html',
  styleUrl: './location.css'
})
export class LocationComponent {}
