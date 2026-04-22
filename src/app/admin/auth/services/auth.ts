import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);

  login(email: string, password: string) {
    console.log('Base Url: ', this.apiService.baseUrl);
    
    return this.http.post<any>(`${this.apiService.baseUrl}/login`, {
      email,
      password,
    });
  }

  logout() {
    return this.http.post(`${this.apiService.baseUrl}/logout`, {});
  }
}
