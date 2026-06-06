import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiStateService } from '../../core/services/ui-state.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  poolView: boolean;
  price: string;
  sqft: string;
  facing: string;
  images: string[];
  currentImageIndex: number;
}

@Component({
  selector: 'app-accommodations',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.css'
})
export class AccommodationsComponent {
  private uiState = inject(UiStateService);

  rooms: Room[] = [
    { 
      id: '1', 
      name: 'The Aarambh Suite', 
      description: 'Spacious, airy, and beautifully designed with a strong villa-like feel. Ideal for couples or small families looking for a peaceful stay.',
      capacity: 2, 
      poolView: true, 
      price: '₹4,500', 
      sqft: '450 sq.ft.',
      facing: 'East Facing',
      images: [
        'aarambh-suite-1.JPG',
        'aarambh-suite-2.JPG',
        'aarambh-suite-3.JPG'
      ],
      currentImageIndex: 0
    },
    { 
      id: '2', 
      name: 'The Grand Duplex', 
      description: 'Perfect for larger families or group stays. Enjoy premium comfort, generous space, and a relaxing atmosphere surrounded by nature.',
      capacity: 4, 
      poolView: false, 
      price: '₹6,000', 
      sqft: '850 sq.ft.',
      facing: 'North Facing',
      images: [
        'grand-duplex-1.JPG',
        'grand-duplex-2.JPG',
        'grand-duplex-3.JPG',
        'grand-duplex-4.JPG'
      ],
      currentImageIndex: 0
    }
  ];

  nextImage(room: Room, event: Event) {
    event.stopPropagation();
    room.currentImageIndex = (room.currentImageIndex + 1) % room.images.length;
  }

  prevImage(room: Room, event: Event) {
    event.stopPropagation();
    room.currentImageIndex = (room.currentImageIndex - 1 + room.images.length) % room.images.length;
  }

  bookRoom(room: Room) {
    this.uiState.openBookingModal({
      roomType: room.name
    });
  }

  // Lightbox State
  isLightboxOpen = false;
  activeLightboxImages: string[] = [];
  activeLightboxIndex = 0;

  openLightbox(room: Room, event: Event) {
    event.stopPropagation();
    this.activeLightboxImages = room.images;
    this.activeLightboxIndex = room.currentImageIndex;
    this.isLightboxOpen = true;
  }

  closeLightbox() {
    this.isLightboxOpen = false;
  }

  nextLightboxImage(event: Event) {
    event.stopPropagation();
    this.activeLightboxIndex = (this.activeLightboxIndex + 1) % this.activeLightboxImages.length;
  }

  prevLightboxImage(event: Event) {
    event.stopPropagation();
    this.activeLightboxIndex = (this.activeLightboxIndex - 1 + this.activeLightboxImages.length) % this.activeLightboxImages.length;
  }
}
