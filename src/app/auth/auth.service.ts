import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type UserType = 'admin' | 'morador' | 'porteiro' | null;

@Injectable({ providedIn: 'root' })
export class AuthService {
  userType = signal<UserType>(this.getStoredUserType());

  constructor(private router: Router) {}

  private getStoredUserType(): UserType {
    const stored = localStorage.getItem('userType') as UserType;
    return stored === 'admin' || stored === 'morador' || stored === 'porteiro' ? stored : null;
  }

  private setUserType(type: UserType) {
    this.userType.set(type);
    if (type) localStorage.setItem('userType', type);
    else localStorage.removeItem('userType');
  }

  login(username: string, password: string) {
    let type: UserType = null;

    if (username === 'admin' && password === 'admin') type = 'admin';
    else if (username === 'porteiro' && password === 'porteiro') type = 'porteiro';
    else if (username === 'morador' && password === 'morador') type = 'morador';
    else {
      alert('Usuário ou senha inválidos');
      return;
    }

    this.setUserType(type);
    this.router.navigate(['/home']);
  }

  logout() {
    this.setUserType(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.userType() !== null;
  }
}
