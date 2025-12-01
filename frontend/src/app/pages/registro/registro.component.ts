import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  private apiUrl = `${environment.apiUrl}auth/register`;

  registroData = {
    fullName: '',
    email: '',
    phone: '',
    userType: '',
    bloco: '',
    apartment: '',
    password: '',
    comprovante: null as File | null
  };

  registroMessage: string = '';
  isSuccess: boolean = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.registroData.comprovante = input.files[0];
    }
  }

  registrar(): void {
    if (!this.registroData.fullName || !this.registroData.email || !this.registroData.password ||
        !this.registroData.userType || !this.registroData.bloco || !this.registroData.apartment ||
        !this.registroData.comprovante) {
      this.isSuccess = false;
      this.registroMessage = 'Preencha todos os campos obrigatórios e anexe o comprovante.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.registroData.fullName);
    formData.append('email', this.registroData.email);
    formData.append('phone', this.registroData.phone);
    formData.append('role_id', this.registroData.userType);
    formData.append('unit_id', `${this.registroData.bloco}-${this.registroData.apartment}`);
    formData.append('password', this.registroData.password);
    formData.append('comprovante', this.registroData.comprovante);

    this.http.post(this.apiUrl, formData).subscribe({
      next: (res: any) => {
        this.isSuccess = true;
        this.registroMessage = 'Cadastro enviado com sucesso!';
      },
      error: (err) => {
        if (err.status === 400) {
          this.registroMessage = 'Unidade não cadastrada.';
        } else {
          this.isSuccess = false;
          this.registroMessage = err.error?.message || 'Erro ao registrar usuário.';
        }
      }
    });
  }
}
