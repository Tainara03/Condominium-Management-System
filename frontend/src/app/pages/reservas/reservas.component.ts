import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface CommonArea {
  id_area: string;
  name: string;
  capacity: number;
}

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  dataMinima = new Date().toISOString().split('T')[0];
  private http = inject(HttpClient);
  private apiUrlReservas = `${environment.apiUrl}reservas`;  
  private apiUrlAreas = `${environment.apiUrl}common-areas`;

  isLoading = false;
  areas: CommonArea[] = [];

  reservaForm = {
    area_id: '',
    data: '',
    periodo: '',
    descricao: ''
  };

  ngOnInit(): void {
    this.carregarAreas();
  }

  carregarAreas() {
    this.http.get<CommonArea[]>(this.apiUrlAreas).subscribe({
      next: (dados) => {
        this.areas = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar áreas comuns:', erro);
      }
    });
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

    const token = localStorage.getItem('token'); 
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.post(this.apiUrlReservas, payload, { headers }).subscribe({
      next: (resposta) => {
        alert('Reserva realizada com sucesso!');
        this.isLoading = false;
        
        this.reservaForm.periodo = '';
        this.reservaForm.area_id = '';
        this.reservaForm.data = '';
        this.reservaForm.descricao = '';
      },
      error: (erro) => {
        console.error('Erro ao reservar:', erro);
        if (erro.status === 401) {
            alert('Sua sessão expirou. Faça login novamente.');
        } else if (erro.status === 409) {
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