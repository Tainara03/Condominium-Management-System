import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userType = signal<'admin' | 'morador' | 'porteiro' | null>(null);

  isLoggedIn = computed(() => this.userType() !== null);

  loginAs(type: 'admin' | 'morador' | 'porteiro') {
    this.userType.set(type);
  }

  logout() {
    this.userType.set(null);
  }

  getUserType(): 'admin' | 'morador' | 'porteiro' | null {
    return this.userType();
  }
}