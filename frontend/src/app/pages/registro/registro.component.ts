import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  private apiUrl = `${environment.apiUrl}registro`;  
  
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

  constructor() {} 

  onFileSelected(event: Event): void {
    this.registroMessage = '';
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.registroData.comprovante = input.files[0];
    }
  }

  registrar(): void {
    this.registroMessage = ''; 

    if (!this.registroData.fullName || this.registroData.password.length < 6 || !this.registroData.userType) {
      this.isSuccess = false;
      this.registroMessage = 'Por favor, preencha todos os campos obrigatórios e verifique a senha.';
      return;
    }

    if (!this.registroData.comprovante) {
      this.isSuccess = false;
      this.registroMessage = 'É necessário anexar um comprovante de vínculo com o condomínio.';
      return;
    }

    this.isSuccess = true;
    this.registroMessage = 'Cadastro enviado com sucesso! Sua conta será ativada após a verificação do comprovante.';
  }
}