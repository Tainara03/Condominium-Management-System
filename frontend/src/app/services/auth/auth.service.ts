import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  userType = signal<'admin' | 'morador' | 'funcionario' | null>(null);
  token = signal<string | null>(null);

  isLoggedIn = computed(() => this.userType() !== null && this.token() !== null);

  setUserType(type: 'admin' | 'morador' | 'funcionario' | null) {
    this.userType.set(type);
  }

  setToken(jwt: string | null) {
    this.token.set(jwt);
    if (jwt) {
      localStorage.setItem('authToken', jwt);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  loginAs(type: 'admin' | 'morador' | 'funcionario', jwt?: string) {
    this.userType.set(type);
    if (jwt) {
      this.setToken(jwt);
    }
  }

  logout() {
    this.userType.set(null);
    this.setToken(null);
    this.router.navigate(['/login']);
  }

  getUserType(): 'admin' | 'morador' | 'funcionario' | null {
    return this.userType();
  }

  getToken(): string | null {
    return this.token() || localStorage.getItem('authToken');
  }
}
