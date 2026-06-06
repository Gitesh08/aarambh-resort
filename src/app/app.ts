import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shell/header/header.component';
import { HeroComponent } from './home/hero/hero.component';
import { AboutComponent } from './home/about/about.component';
import { BookingModalComponent } from './shared/components/booking-modal/booking-modal.component';
import { MarqueeComponent } from './shared/components/marquee/marquee.component';
import { AccommodationsComponent } from './home/accommodations/accommodations.component';
import { AmenitiesComponent } from './home/amenities/amenities.component';
import { DiningComponent } from './home/dining/dining.component';
import { SightseeingComponent } from './home/sightseeing/sightseeing.component';
import { GalleryComponent } from './home/gallery/gallery.component';
import { ReviewsComponent } from './home/reviews/reviews.component';
import { FaqComponent } from './home/faq/faq.component';
import { LocationComponent } from './home/location/location.component';
import { FooterComponent } from './shell/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    HeroComponent, 
    AboutComponent,
    BookingModalComponent,
    MarqueeComponent,
    AccommodationsComponent,
    AmenitiesComponent,
    DiningComponent,
    SightseeingComponent,
    GalleryComponent,
    ReviewsComponent,
    FaqComponent,
    LocationComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Aarambh Resort';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const preloader = document.getElementById('site-preloader');
        if (preloader) {
          preloader.classList.add('fade-out');
          setTimeout(() => {
            preloader.remove();
          }, 800); // Wait for CSS transition
        }
      }, 2500); // Show for 2.5 seconds minimum
    }
  }
}
