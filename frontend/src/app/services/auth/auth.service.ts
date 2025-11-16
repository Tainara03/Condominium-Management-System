import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: mudar default para null quando implementar o login
  userType = signal<'admin' | 'morador' | 'porteiro' | null>('morador');

  loginAs(type: 'admin' | 'morador' | 'porteiro') {
    this.userType.set(type);
  }

  logout() {
    this.userType.set(null);
  }
}
