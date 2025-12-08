import { Component, inject, OnInit } from '@angular/core'; // Adicionei inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface CobrancaBackend {
  id: string;
  ammount: string;
  due_date: string;
  status?: string;
  is_paid: boolean;
  file_path: string;
  unit: {
    building: string;
    apartment: string;
  };
  tipo_cobranca?: string; 
  dataLancamento?: string;
}

@Component({
  selector: 'app-cobrancas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './cobrancas.component.html',
  styleUrls: ['./cobrancas.component.css']
})
export class CobrancasComponent implements OnInit {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}cobrancas`;  

  cobrancas: any[] = [];
  cobrancasFiltradas: any[] = [];
  
  filtros = {
      bloco: '',
      apartamento: '',
      status: ''
  };
  
  constructor(public auth: AuthService) {} 

  ngOnInit(): void {
    this.carregarCobrancas();
  }

  carregarCobrancas(): void {
    this.http.get<CobrancaBackend[]>(this.apiUrl).subscribe({
      next: (dados) => {
        this.cobrancas = dados.map(item => {
          const statusCalculado = this.calcularStatus(item);
          
          return {
            bloco: item.unit?.building || '-',
            apartamento: item.unit?.apartment || '-',
            dataLancamento: 'Automático',
            tipoCobranca: item.tipo_cobranca || '-',
            valor: this.formatarMoeda(item.ammount),
            dataVencimento: new Date(item.due_date).toLocaleDateString('pt-BR'),
            status: statusCalculado,
            linkComprovante: item.file_path ? `${environment.apiUrl}uploads/${item.file_path}` : null,
            rawDate: new Date(item.due_date)
          };
        });
        
        this.aplicarFiltros();
      },
      error: (erro) => {
        console.error('Erro ao buscar cobranças', erro);
        alert('Erro ao carregar lista de cobranças.');
      }
    });
  }

  calcularStatus(item: CobrancaBackend): string {
    if (item.is_paid) return 'Pago';
    const hoje = new Date();
    const vencimento = new Date(item.due_date);
    return vencimento < hoje ? 'Atrasado' : 'Pendente';
  }

  formatarMoeda(valor: string | number): string {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  aplicarFiltros(): void {
    let temp = this.cobrancas;

    if (this.filtros.bloco) {
      temp = temp.filter(c => c.bloco === this.filtros.bloco);
    }
    
    if (this.filtros.apartamento) {
      temp = temp.filter(c => c.apartamento.includes(this.filtros.apartamento));
    }
    
    if (this.filtros.status) {
      temp = temp.filter(c => c.status === this.filtros.status);
    }
    
    this.cobrancasFiltradas = temp;
  }

  resetarFiltros(): void {
      this.filtros = { bloco: '', apartamento: '', status: '' };
      this.aplicarFiltros();
  }
}