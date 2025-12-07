import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-ocorrencias',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.css'
})
export class OcorrenciasComponent {

  private apiUrl = environment.apiUrl;

  title: string = '';
  message: string = '';
  date: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  enviarComunicado(): void {
    if (!this.title || !this.message || !this.date) {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    const payload = {
      title: this.title,
      message: this.message,
      sent_at: this.date,
      user_id: this.authService.getUserId()
    };

    this.http.post(`${this.apiUrl}notices`, payload).subscribe({
      next: (res) => {
        alert('Comunicado enviado com sucesso!');
        this.resetarFormulario();
      },
      error: (err) => {
        console.error('Erro ao enviar comunicado', err);
        alert('Erro ao enviar comunicado. Tente novamente.');
      }
    });
  }

  resetarFormulario(): void {
    this.title = '';
    this.message = '';
    this.date = '';
  }
}
