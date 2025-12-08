import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Evento {
  id: string;
  tipo: string;
  data: Date;
  mensagem: string;
  bloco?: string;
  apto?: string;
  statusDetalhe?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private apiUrl = `${environment.apiUrl}history`;

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  filtroTipo: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarEventosDoBackend();
  }

  carregarEventosDoBackend(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (res) => {
        this.eventos = res.map(ev => ({
          id: ev.id,
          tipo: this.mapearTipo(ev.table_name),
          data: new Date(ev.created_at),
          mensagem: this.mapearMensagem(ev),
          bloco: undefined,
          apto: undefined,
          statusDetalhe: undefined
        }));
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Erro ao carregar histórico:', err);
      }
    });
  }

  mapearTipo(table: string): string {
    const t = table.toLowerCase();
    if (t === 'billings' || t === 'billing') return 'COBRANCA';
    if (t === 'packages') return 'ENCOMENDA';
    if (t === 'notices') return 'COMUNICADO';
    if (t === 'reservations') return 'RESERVA';
    if (t === 'occurrences') return 'OCORRENCIA';
    if (t === 'users') return 'CADASTRO';
    return 'OUTRO';
  }

  mapearMensagem(ev: any): string {
    if (ev.event_title) return ev.event_title;
    return `Atividade registrada na tabela ${ev.table_name}`;
  }

  aplicarFiltros(): void {
    let tempEventos = this.eventos;
    if (this.filtroTipo) {
      tempEventos = tempEventos.filter(e => e.tipo === this.filtroTipo);
    }
    this.eventosFiltrados = tempEventos;
  }

  getTitulo(evento: Evento): string {
    const prefixo = evento.statusDetalhe ? `[${evento.statusDetalhe}] ` : '';
    switch (evento.tipo) {
      case 'COBRANCA': return prefixo + 'Nova Cobrança Lançada';
      case 'ENCOMENDA': return prefixo + 'Encomenda Recebida';
      case 'COMUNICADO': return prefixo + 'Novo Comunicado';
      case 'RESERVA': return prefixo + 'Atualização de Reserva';
      case 'OCORRENCIA': return prefixo + 'Ocorrência Registrada';
      case 'CADASTRO': return prefixo + 'Novo Cadastro de Usuário';
      default: return 'Nova Atividade';
    }
  }

  getIcone(tipo: Evento['tipo']): string {
    switch (tipo) {
      case 'COBRANCA': return 'bi bi-cash-stack text-success';
      case 'ENCOMENDA': return 'bi bi-box-seam text-info';
      case 'COMUNICADO': return 'bi bi-megaphone text-primary';
      case 'RESERVA': return 'bi bi-calendar-check text-primary';
      case 'OCORRENCIA': return 'bi bi-exclamation-triangle text-warning';
      case 'CADASTRO': return 'bi bi-person-fill-add text-danger';
      default: return 'bi bi-bell';
    }
  }

  getCardStyle(tipo: Evento['tipo']): string {
    switch (tipo) {
      case 'COBRANCA': return 'list-group-item-success';
      case 'ENCOMENDA': return 'list-group-item-info';
      case 'COMUNICADO': return 'list-group-item-primary';
      case 'OCORRENCIA': return 'list-group-item-warning';
      case 'CADASTRO': return 'list-group-item-danger';
      default: return '';
    }
  }
}
