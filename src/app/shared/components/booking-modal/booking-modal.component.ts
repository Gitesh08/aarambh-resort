import { Component, inject, signal, effect, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UiStateService, BookingData } from '../../../core/services/ui-state.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// @ts-ignore
import * as flags from 'country-flag-icons/string/3x2';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.css'
})
export class BookingModalComponent implements OnDestroy {
  private uiState = inject(UiStateService);
  private sanitizer = inject(DomSanitizer);
  
  @ViewChild('bookingForm') bookingForm!: NgForm;

  isOpen = this.uiState.isBookingModalOpen;
  currentStep = signal(1);

  // Country Logic
  countryCode = '+91';
  showDropdown = false;
  countryCodes: { code: string; dial: string; name: string; flag: SafeHtml }[] = [];
  selectedCountry!: { code: string; dial: string; name: string; flag: SafeHtml };

  private readonly DIAL_MAP: [string, string, string][] = [
    // South Asia
    ['IN', '+91',  'India'],
    ['PK', '+92',  'Pakistan'],
    ['BD', '+880', 'Bangladesh'],
    ['LK', '+94',  'Sri Lanka'],
    ['NP', '+977', 'Nepal'],
    ['BT', '+975', 'Bhutan'],
    ['MV', '+960', 'Maldives'],
    ['AF', '+93',  'Afghanistan'],
    // North America
    ['US', '+1',   'USA'],
    ['CA', '+1',   'Canada'],
    ['MX', '+52',  'Mexico'],
    ['PR', '+1',   'Puerto Rico'],
    // Europe
    ['GB', '+44',  'UK'],
    ['DE', '+49',  'Germany'],
    ['FR', '+33',  'France'],
    ['IT', '+39',  'Italy'],
    ['ES', '+34',  'Spain'],
    ['NL', '+31',  'Netherlands'],
    ['SE', '+46',  'Sweden'],
    ['NO', '+47',  'Norway'],
    ['DK', '+45',  'Denmark'],
    ['FI', '+358', 'Finland'],
    ['CH', '+41',  'Switzerland'],
    ['AT', '+43',  'Austria'],
    ['BE', '+32',  'Belgium'],
    ['PT', '+351', 'Portugal'],
    ['IE', '+353', 'Ireland'],
    ['PL', '+48',  'Poland'],
    ['RU', '+7',   'Russia'],
    ['UA', '+380', 'Ukraine'],
    ['GR', '+30',  'Greece'],
    ['CZ', '+420', 'Czech Republic'],
    ['HU', '+36',  'Hungary'],
    ['RO', '+40',  'Romania'],
    ['BG', '+359', 'Bulgaria'],
    ['HR', '+385', 'Croatia'],
    ['SK', '+421', 'Slovakia'],
    ['LT', '+370', 'Lithuania'],
    ['LV', '+371', 'Latvia'],
    ['EE', '+372', 'Estonia'],
    ['LU', '+352', 'Luxembourg'],
    ['MT', '+356', 'Malta'],
    ['IS', '+354', 'Iceland'],
    // Middle East
    ['AE', '+971', 'UAE'],
    ['SA', '+966', 'Saudi Arabia'],
    ['QA', '+974', 'Qatar'],
    ['KW', '+965', 'Kuwait'],
    ['BH', '+973', 'Bahrain'],
    ['OM', '+968', 'Oman'],
    ['IL', '+972', 'Israel'],
    ['TR', '+90',  'Turkey'],
    ['IR', '+98',  'Iran'],
    ['JO', '+962', 'Jordan'],
    ['LB', '+961', 'Lebanon'],
    ['IQ', '+964', 'Iraq'],
    // Asia Pacific
    ['CN', '+86',  'China'],
    ['JP', '+81',  'Japan'],
    ['KR', '+82',  'South Korea'],
    ['SG', '+65',  'Singapore'],
    ['ID', '+62',  'Indonesia'],
    ['MY', '+60',  'Malaysia'],
    ['TH', '+66',  'Thailand'],
    ['PH', '+63',  'Philippines'],
    ['VN', '+84',  'Vietnam'],
    ['HK', '+852', 'Hong Kong'],
    ['TW', '+886', 'Taiwan'],
    ['MO', '+853', 'Macau'],
    ['KH', '+855', 'Cambodia'],
    ['MM', '+95',  'Myanmar'],
    ['LA', '+856', 'Laos'],
    ['MN', '+976', 'Mongolia'],
    ['AU', '+61',  'Australia'],
    ['NZ', '+64',  'New Zealand'],
    ['FJ', '+679', 'Fiji'],
    ['PG', '+675', 'Papua New Guinea'],
    // Africa
    ['ZA', '+27',  'South Africa'],
    ['NG', '+234', 'Nigeria'],
    ['KE', '+254', 'Kenya'],
    ['GH', '+233', 'Ghana'],
    ['EG', '+20',  'Egypt'],
    ['ET', '+251', 'Ethiopia'],
    ['TZ', '+255', 'Tanzania'],
    ['MA', '+212', 'Morocco'],
    ['DZ', '+213', 'Algeria'],
    ['TN', '+216', 'Tunisia'],
    ['UG', '+256', 'Uganda'],
    ['CI', '+225', 'Ivory Coast'],
    ['SN', '+221', 'Senegal'],
    ['CM', '+237', 'Cameroon'],
    ['ZM', '+260', 'Zambia'],
    ['ZW', '+263', 'Zimbabwe'],
    ['BW', '+267', 'Botswana'],
    ['MU', '+230', 'Mauritius'],
    // Latin America
    ['BR', '+55',  'Brazil'],
    ['AR', '+54',  'Argentina'],
    ['CO', '+57',  'Colombia'],
    ['CL', '+56',  'Chile'],
    ['PE', '+51',  'Peru'],
    ['VE', '+58',  'Venezuela'],
    ['EC', '+593', 'Ecuador'],
    ['GT', '+502', 'Guatemala'],
    ['CU', '+53',  'Cuba'],
    ['BO', '+591', 'Bolivia'],
    ['DO', '+1-809', 'Dominican Rep.'],
    ['HN', '+504', 'Honduras'],
    ['PY', '+595', 'Paraguay'],
    ['SV', '+503', 'El Salvador'],
    ['NI', '+505', 'Nicaragua'],
    ['CR', '+506', 'Costa Rica'],
    ['PA', '+507', 'Panama'],
    ['UY', '+598', 'Uruguay'],
    ['JM', '+1-876', 'Jamaica'],
    ['TT', '+1-868', 'Trinidad & Tobago'],
  ];

  localData: BookingData = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'The Aarambh Suite',
    specialRequests: ''
  };

  get minDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get minCheckOutDate(): string {
    if (this.localData.checkIn) {
      return this.localData.checkIn;
    }
    return this.minDate;
  }

  isDateInPast(dateString: string | undefined, compareTo?: string): boolean {
    if (!dateString) return false;
    const selected = new Date(dateString);
    const min = new Date(compareTo || this.minDate);
    // Strip time for accurate comparison
    selected.setHours(0,0,0,0);
    min.setHours(0,0,0,0);
    return selected < min;
  }

  onCheckInChange(value: string) {
    if (this.isDateInPast(value)) {
        // Forcefully reset if Safari bypasses the native min attribute
        setTimeout(() => this.localData.checkIn = '', 0);
    } else {
        this.localData.checkIn = value;
        // Auto-correct checkout if it's now before check-in
        if (this.localData.checkOut && this.isDateInPast(this.localData.checkOut, value)) {
            this.localData.checkOut = '';
        }
    }
  }

  onCheckOutChange(value: string) {
    if (this.isDateInPast(value, this.minCheckOutDate)) {
        setTimeout(() => this.localData.checkOut = '', 0);
    } else {
        this.localData.checkOut = value;
    }
  }

  isSubmitting = signal(false);
  cooldownRemaining = signal(0);
  private cooldownTimer: any;

  constructor() {
    this.countryCodes = this.DIAL_MAP.map(([code, dial, name]) => ({
      code, dial, name,
      flag: this.sanitizer.bypassSecurityTrustHtml((flags as Record<string, string>)[code] ?? '')
    }));
    this.selectedCountry = this.countryCodes[0];
    this.countryCode = this.selectedCountry.dial;

    effect(() => {
      if (this.isOpen()) {
        const globalData = this.uiState.bookingData();
        this.localData = { ...this.localData, ...globalData };
        // Reset to step 1 when opened, if not in cooldown
        if (!this.isSubmitting() && this.cooldownRemaining() === 0) {
            this.currentStep.set(1);
        }
      }
    });
  }

  selectCountry(c: typeof this.countryCodes[0]) {
    this.selectedCountry = c;
    this.countryCode = c.dial;
    this.showDropdown = false;
  }

  ngOnDestroy() {
    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
    }
  }

  closeModal() {
    this.showDropdown = false;
    this.uiState.closeBookingModal();
    this.resetForm();
  }

  resetForm() {
    this.localData = {
      checkIn: '',
      checkOut: '',
      guests: 1,
      roomType: 'The Aarambh Suite',
      specialRequests: ''
    };
    if (this.bookingForm) {
      this.bookingForm.resetForm(this.localData);
    }
    this.currentStep.set(1);
    this.selectedCountry = this.countryCodes[0];
    this.countryCode = this.selectedCountry.dial;
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
    if (this.cooldownRemaining() > 0) return;

    const fullPhone = this.localData.phone ? `${this.countryCode} ${this.localData.phone}` : '';

    if (!this.localData.name || !fullPhone) {
        alert("Please provide at least your name and phone number.");
        return;
    }

    this.isSubmitting.set(true);

    const whatsappNumber = "9172167073";
    const specialReqText = this.localData.specialRequests ? `\n*Specific Requirements:*\n${this.localData.specialRequests}\n` : '';

    const message = `*New Booking Inquiry* 🏨

*Guest Details*
👤 Name: ${this.localData.name || 'N/A'}
📞 Phone: ${fullPhone || 'N/A'}
✉️ Email: ${this.localData.email || 'N/A'}

*Stay Details*
🛏️ Room: ${this.localData.roomType}
📅 Check-in: ${this.localData.checkIn || 'Not specified'}
📅 Check-out: ${this.localData.checkOut || 'Not specified'}
👥 Guests: ${this.localData.guests || 1}
${specialReqText}
Please confirm availability and rates.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    this.uiState.updateBookingData(this.localData);

    window.open(whatsappUrl, '_blank');

    this.startCooldown(30);
  }

  private startCooldown(seconds: number) {
    this.cooldownRemaining.set(seconds);
    this.isSubmitting.set(false);

    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
    }

    this.cooldownTimer = setInterval(() => {
      const current = this.cooldownRemaining();
      if (current <= 1) {
        this.cooldownRemaining.set(0);
        clearInterval(this.cooldownTimer);
      } else {
        this.cooldownRemaining.set(current - 1);
      }
    }, 1000);
  }
}
