import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent {
  @ViewChild('lightboxScroll') lightboxScroll!: ElementRef<HTMLElement>;
  
  images = [
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'
  ];



  isLightboxOpen = signal(false);

  openLightbox(index: number) {
    this.isLightboxOpen.set(true);
    setTimeout(() => {
      if (this.lightboxScroll) {
        const scrollEl = this.lightboxScroll.nativeElement;
        const slideWidth = scrollEl.clientWidth;
        scrollEl.scrollTo({ left: slideWidth * index, behavior: 'instant' });
      }
    }, 50);
  }

  closeLightbox() {
    this.isLightboxOpen.set(false);
  }
}
