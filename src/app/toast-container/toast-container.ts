import { Component } from '@angular/core';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-toast-container',
  imports: [],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainer {
  constructor(public toast: ToastService) {}
}
