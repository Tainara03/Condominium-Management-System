import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  userType = signal<'Admin' | 'Sindico' | 'Morador' | 'Funcionario' | null>(null);
  token = signal<string | null>(null);
  userId = signal<string | null>(null);

  isLoggedIn = computed(() => this.userType() !== null && this.token() !== null);

  setUserType(type: 'Admin' | 'Sindico' | 'Morador' | 'Funcionario' | null) {
    this.userType.set(type);
  }

  setToken(jwt: string | null) {
    this.token.set(jwt);
    if (jwt) localStorage.setItem('authToken', jwt);
    else localStorage.removeItem('authToken');
  }

  setUserId(id: string | null) {
    this.userId.set(id);
    if (id) localStorage.setItem('userId', id);
    else localStorage.removeItem('userId');
  }

  loginAs(type: 'Admin' | 'Sindico' | 'Morador' | 'Funcionario', id: string, jwt?: string) {
    this.setUserType(type);
    this.setUserId(id);
    if (jwt) this.setToken(jwt);
  }

  logout() {
    this.setUserType(null);
    this.setUserId(null);
    this.setToken(null);
    this.router.navigate(['/login']);
  }

  getUserType(): 'Admin' | 'Sindico' | 'Morador' | 'Funcionario' | null {
    return this.userType();
  }

  getToken(): string | null {
    return this.token() || localStorage.getItem('authToken');
  }

  getUserId(): string | null {
    return this.userId() || localStorage.getItem('userId');
  }
}
