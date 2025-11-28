import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  userType = signal<'admin' | 'morador' | 'porteiro' | null>(null);

  isLoggedIn = computed(() => this.userType() !== null);

  loginAs(type: 'admin' | 'morador' | 'porteiro') {
    this.userType.set(type);
  }

  logout() {
    this.userType.set(null);
    this.router.navigate(['/login']);
  }

  getUserType(): 'admin' | 'morador' | 'porteiro' | null {
    return this.userType();
  }
}