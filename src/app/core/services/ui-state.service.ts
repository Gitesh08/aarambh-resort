import { Injectable, signal, computed } from '@angular/core';

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType?: string;
  name?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  // Signal for the booking modal visibility
  private readonly _isBookingModalOpen = signal(false);
  public readonly isBookingModalOpen = this._isBookingModalOpen.asReadonly();

  // Signal for the booking data, preserving state between modal opens
  private readonly _bookingData = signal<BookingData>({
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  public readonly bookingData = this._bookingData.asReadonly();

  // Computed state for derived values if needed
  public readonly hasSelectedDates = computed(() => {
    const data = this._bookingData();
    return !!(data.checkIn && data.checkOut);
  });

  openBookingModal(initialData?: Partial<BookingData>) {
    if (initialData) {
      this.updateBookingData(initialData);
    }
    this._isBookingModalOpen.set(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeBookingModal() {
    this._isBookingModalOpen.set(false);
    // Restore background scrolling
    document.body.style.overflow = '';
  }

  updateBookingData(data: Partial<BookingData>) {
    this._bookingData.update(current => ({ ...current, ...data }));
  }
}
