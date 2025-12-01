import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}reservas`;  

  isLoading = false;
  reservaForm = {
    area_id: '',
    data: '',
    periodo: '',
    descricao: ''
  };
  ngOnInit(): void {
  }

  solicitarReserva() {
    if (!this.reservaForm.area_id || !this.reservaForm.data || !this.reservaForm.periodo) {
      alert('Por favor, preencha a Área, a Data e o Período.');
      return;
    }

    this.isLoading = true;
    const dataHoraFormatada = this.calcularHorario(this.reservaForm.data, this.reservaForm.periodo);

    const payload = {
      area_id: this.reservaForm.area_id,
      reservation_date_time: dataHoraFormatada,
      description: this.reservaForm.descricao
    };

    this.http.post(this.apiUrl, payload).subscribe({
      next: (resposta) => {
        alert('Reserva realizada com sucesso!');
        this.isLoading = false;
        // Limpeza de formulário
        this.reservaForm.periodo = '';
        this.reservaForm.area_id = '';
        this.reservaForm.data = '';
      },
      error: (erro) => {
        console.error('Erro ao reservar:', erro);
        if (erro.status === 409) {
          alert('Já existe uma reserva para este local e horário!');
        } else {
          alert('Erro ao realizar a reserva. Verifique o console.');
        }
        this.isLoading = false;
      }
    });
  }

  calcularHorario(dataStr: string, periodo: string): Date {
    const data = new Date(dataStr);
    data.setMinutes(data.getMinutes() + data.getTimezoneOffset());

    if (periodo === '1') {
        data.setHours(8, 0, 0); 
    } else if (periodo === '2') {
        data.setHours(13, 0, 0);
    } else if (periodo === '3') {
        data.setHours(19, 0, 0);
    }
    return data;
  }
}