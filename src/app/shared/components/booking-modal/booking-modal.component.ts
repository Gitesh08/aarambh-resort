import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiStateService, BookingData } from '../../../core/services/ui-state.service';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.css'
})
export class BookingModalComponent {
  private uiState = inject(UiStateService);
  
  isOpen = this.uiState.isBookingModalOpen;
  currentStep = signal(1);

  localData: BookingData = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'standard'
  };

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        const globalData = this.uiState.bookingData();
        this.localData = { ...this.localData, ...globalData };
        this.currentStep.set(1);
      }
    });
  }

  closeModal() {
    this.uiState.closeBookingModal();
  }

  closeOnBackdrop() {
    this.closeModal();
  }

  nextStep() {
    if (this.currentStep() < 3) {
      this.currentStep.update(v => v + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(v => v - 1);
    }
  }

  selectRoom(type: string) {
    this.localData.roomType = type;
  }

  submitBooking() {
    console.log('Booking submitted!', this.localData);
    this.uiState.updateBookingData(this.localData);
    alert('Thank you for your inquiry! We will contact you soon.');
    this.closeModal();
  }
}
