import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

interface Cobranca {
  bloco: string;
  apartamento: string;
  dataLancamento: string;
  tipoCobranca: string;
  valor: string;
  dataVencimento: string;
  status: 'Pendente' | 'Pago' | 'Atrasado';
  linkComprovante: string;
}

interface Filtros {
    bloco: string;
    apartamento: string;
    status: 'Pendente' | 'Pago' | 'Atrasado' | '';
}

@Component({
  selector: 'app-cobrancas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cobrancas.component.html',
  styleUrls: ['./cobrancas.component.css']
})
export class CobrancasComponent implements OnInit {

  private apiUrl = `${environment.apiUrl}cobrancas`;  

  cobrancas: Cobranca[] = [];
  cobrancasFiltradas: Cobranca[] = [];
  
  filtros: Filtros = {
      bloco: '',
      apartamento: '',
      status: ''
  };
  
  constructor(public auth: AuthService) {} 

  ngOnInit(): void {
    this.carregarCobrancas();
  }

  carregarCobrancas(): void {
    const dadosIniciais: Cobranca[] = [
      { bloco: 'A', apartamento: '101', dataLancamento: '28/11/2025', tipoCobranca: 'Condomínio', valor: 'R$350,00', dataVencimento: '28/12/2025', status: 'Pendente', linkComprovante: '#' },
      { bloco: 'B', apartamento: '203', dataLancamento: '28/10/2025', tipoCobranca: 'Água', valor: 'R$85,50', dataVencimento: '10/11/2025', status: 'Pago', linkComprovante: '#' },
      { bloco: 'A', apartamento: '101', dataLancamento: '28/09/2025', tipoCobranca: 'Multa', valor: 'R$150,00', dataVencimento: '05/10/2025', status: 'Atrasado', linkComprovante: '#' },
      { bloco: 'B', apartamento: '203', dataLancamento: '28/11/2025', tipoCobranca: 'Condomínio', valor: 'R$400,00', dataVencimento: '28/12/2025', status: 'Pendente', linkComprovante: '#' }
    ];
    this.cobrancas = dadosIniciais;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let tempCobrancas = this.cobrancas;

    if (this.filtros.bloco) {
      tempCobrancas = tempCobrancas.filter(c => c.bloco === this.filtros.bloco);
    }
    
    if (this.filtros.apartamento) {
      const apto = this.filtros.apartamento;
      tempCobrancas = tempCobrancas.filter(c => c.apartamento.includes(apto));
    }
    
    if (this.filtros.status) {
      tempCobrancas = tempCobrancas.filter(c => c.status === this.filtros.status);
    }
    
    this.cobrancasFiltradas = tempCobrancas;
  }

  resetarFiltros(): void {
      this.filtros = { bloco: '', apartamento: '', status: '' };
      this.aplicarFiltros();
  }
}