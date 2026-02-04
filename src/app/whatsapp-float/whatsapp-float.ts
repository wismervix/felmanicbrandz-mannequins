import { Component } from '@angular/core';

export interface WhatsAppContact {
  label: string;
  number: string;
}

@Component({
  selector: 'app-whatsapp-float',
  imports: [],
  templateUrl: './whatsapp-float.html',
  styleUrl: './whatsapp-float.scss',
})
export class WhatsappFloat {
  isOpen = false;

  contacts: WhatsAppContact[] = [
    { label: 'Sales', number: '2349021866293' },
    { label: 'Support', number: '2349034495606' },
  ];

  toggle() {
    this.isOpen = !this.isOpen;
  }

  getWhatsAppLink(number: string): string {
    return `https://wa.me/${number}`;
  }

  formatNumber(number: string): string {
    // +234 801 234 5678
    return `+${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 10)} ${number.slice(10)}`;
  }
}
