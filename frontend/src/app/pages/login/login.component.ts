import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service'; // Ajuste o caminho conforme a localização do seu AuthService
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  
  loginMessage: string = '';
  isSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const validUsername = 'admin';
    const validPassword = 'admin';

    this.loginMessage = '';

    if (this.username === validUsername && this.password === validPassword) {
      this.isSuccess = true;
      this.loginMessage = 'Login realizado com sucesso! Redirecionando...';
      
      this.authService.loginAs('porteiro');
      console.log('Usuário logado como:', this.authService.getUserType());
      this.router.navigate(['/home']);
    } else {
      this.isSuccess = false;
      this.loginMessage = 'Erro: Nome de usuário ou senha inválidos.';
      this.authService.logout();
    }
  }
}