import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiStateService } from '../../core/services/ui-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  private uiState = inject(UiStateService);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window === 'undefined') return;
    
    // Find the accommodations section to know exactly when the hero section is finished
    const accommodationsSection = document.getElementById('accommodations');
    if (accommodationsSection) {
      const rect = accommodationsSection.getBoundingClientRect();
      // rect.top is distance from viewport top. 80 is the navbar height.
      // When rect.top <= 80, the accommodations section has reached the navbar.
      this.isScrolled.set(rect.top <= 80);
    } else {
      // Fallback if section is missing
      this.isScrolled.set(window.scrollY > window.innerHeight - 80);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  openBooking() {
    this.uiState.openBookingModal();
  }

  openBookingMobile() {
    this.toggleMobileMenu();
    this.uiState.openBookingModal();
  }
}
