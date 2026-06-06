import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Testimonial {
  author: string;
  text: string;
  platform: string;
  platformIcon: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.css'
})
export class ReviewsComponent {
  testimonials: Testimonial[] = [
    {
      author: 'Ratul Sahu',
      text: 'It was an awesome experience staying here. The resort is well-maintained, the food is delicious, and the service is top-notch. The staff’s behaviour was very respectful and caring towards guests. Would definitely visit again.',
      platform: 'Google',
      platformIcon: 'fa-brands fa-google'
    },
    {
      author: 'Swapnil Masaye',
      text: 'Our stay at Aarambh Resort was an amazing experience from start to finish. The resort offers the perfect combination of comfort, nature, and relaxation. Surrounded by peaceful greenery and a refreshing atmosphere, it is an ideal place to escape from the busy city life.',
      platform: 'TripAdvisor',
      platformIcon: 'fa-brands fa-tripadvisor'
    },
    {
      author: 'Priya Sharma',
      text: 'The highlight of our trip! Aarambh offers an unmatched blend of pristine nature and elite hospitality. Waking up to the sound of the creek and enjoying the 100% homemade meals made our weekend unforgettable.',
      platform: 'Facebook',
      platformIcon: 'fa-brands fa-facebook'
    },
    {
      author: 'Sneha Patil',
      text: 'Absolutely beautiful property. The rooms are spotless, the pool is huge, and you can really feel the breeze from the creek. The staff arranged a lovely candle-lit dinner for us. Highly recommended!',
      platform: 'Google',
      platformIcon: 'fa-brands fa-google'
    }
  ];
}
