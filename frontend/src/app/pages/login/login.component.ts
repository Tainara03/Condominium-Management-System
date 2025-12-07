import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private apiUrl = `${environment.apiUrl}auth/login`;  

  email: string = '';
  password: string = '';
  
  loginMessage: string = '';
  isSuccess: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient
  ) {}

  login(): void {
    this.loginMessage = '';
    this.http.post<LoginResponse>(this.apiUrl, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        const role = res.user.role.role;
        const allowedTypes = ['admin', 'morador', 'funcionario', 'sindico'] as const;
        if (!allowedTypes.includes(role as any)) {
          this.loginMessage = 'Erro: tipo de usuário inválido.';
          this.isSuccess = false;
          return;
        }

        this.isSuccess = true;
        this.loginMessage = 'Login realizado com sucesso! Redirecionando...';

        this.authService.setToken(res.token);
        if(role === 'sindico'){
          this.authService.setUserType('admin');
        }
        this.authService.setUserType(role as 'admin' | 'morador' | 'funcionario');

        // Redireciona
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.isSuccess = false;
        if (err.status === 401 || err.status === 404) {
          this.loginMessage = 'Erro: Usuário ou senha inválidos.';
        }
        else if (err.status === 403) {
          this.loginMessage = 'Erro: Usuário não está ativo. Contate o síndico';
        } else {
          this.loginMessage = 'Erro: Falha ao conectar com o servidor.';
        }
        this.authService.logout();
      }
    });
  }
}
