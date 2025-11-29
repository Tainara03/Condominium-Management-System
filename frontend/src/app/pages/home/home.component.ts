import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Interface Genérica para qualquer Evento no Feed
interface Evento {
    id: number;
    tipo: 'COBRANCA' | 'ENCOMENDA' | 'OCORRENCIA' | 'RESERVA' | 'CADASTRO';
    data: Date;
    mensagem: string;
    bloco?: string;
    apto?: string;
    statusDetalhe?: string; // Ex: 'Pendente' / 'Aprovada' / 'Entregue'
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  filtroTipo: string = '';

  constructor() { }

  ngOnInit(): void {
    this.carregarEventosSimulados();
    this.aplicarFiltros();
  }

  carregarEventosSimulados(): void {
    this.eventos = [
      { id: 1, tipo: 'COBRANCA', data: new Date(), statusDetalhe: 'Pendente', mensagem: 'Condomínio referente a Dezembro/2025. Vencimento em 28/12.', bloco: 'A', apto: '101' },
      { id: 2, tipo: 'ENCOMENDA', data: new Date(Date.now() - 3600000), statusDetalhe: 'Na Portaria', mensagem: 'Nova caixa registrada na portaria para Bloco B, Apto 201.', bloco: 'B', apto: '201' },
      { id: 3, tipo: 'RESERVA', data: new Date(Date.now() - 7200000), statusDetalhe: 'Aprovada', mensagem: 'Sua reserva para o Salão de Festas (Noite) foi aprovada.', bloco: 'A', apto: '101' },
      { id: 4, tipo: 'OCORRENCIA', data: new Date(Date.now() - 10800000), statusDetalhe: 'Em Análise', mensagem: 'Nova reclamação registrada: Barulho excessivo vindo do vizinho.', bloco: 'B', apto: '201' },
      { id: 5, tipo: 'CADASTRO', data: new Date(Date.now() - 86400000), statusDetalhe: 'Pendente', mensagem: 'Novo morador cadastrado aguardando aprovação de vínculo.', bloco: 'C', apto: '304' },
    ];
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
      case 'ENCOMENDA': return prefixo + 'Encomenda Chegou!';
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
      case 'OCORRENCIA': return 'list-group-item-warning';
      case 'CADASTRO': return 'list-group-item-danger';
      default: return '';
    }
  }
  
  getLink(tipo: Evento['tipo']): string {
    switch (tipo) {
      case 'COBRANCA': return '/cobrancas';
      case 'ENCOMENDA': return '/encomendas';
      case 'RESERVA': return '/reservas';
      case 'OCORRENCIA': return '/ocorrencias';
      case 'CADASTRO': return '/painel';
      default: return '/';
    }
  }
}