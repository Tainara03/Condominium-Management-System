import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface Unit {
  id: string;
  building: string;
  apartment: string;
}

@Component({
  selector: 'app-cadastro-cobrancas',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './cadastro-cobrancas.component.html',
  styleUrls: ['./cadastro-cobrancas.component.css']
})
export class CadastroCobrancasComponent implements OnInit {
  
  private apiUrl = `${environment.apiUrl}cobrancas`; 
  private apiUrlUnits = `${environment.apiUrl}units`;

  isLoading = false;

  listaBlocos: string[] = [];
  listaApartamentos: string[] = [];

  cobrancaData = {
    tipo: '',
    dataVencimento: '',
    valor: null, 
    modoDestino: 'Todos',
    blocosSelecionados: [] as string[],
    apartamentosSelecionados: [] as string[],
    linkBoleto: '',
    arquivoAnexo: null as File | null,
    descricao: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.carregarUnidades();
  }

carregarUnidades() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<Unit[]>(this.apiUrlUnits, { headers }).subscribe({
    next: (units) => {
        const blocosUnicos = [...new Set(units.map(u => u.building))];
        this.listaBlocos = blocosUnicos
            .filter(b => b && !b.toLowerCase().includes('admin'))
            .sort();

        const aptosUnicos = [...new Set(units.map(u => u.apartment))];
        
        const listaNegra = ['ADM', 'ADMIN', 'PORTARIA', 'ZELADORIA', 'SINDICO', "1"];

        this.listaApartamentos = aptosUnicos
            .filter(a => {
                if (!a) return false;
                const nomeUpper = a.toUpperCase();
                return !nomeUpper.includes('ADM') && !listaNegra.includes(nomeUpper);
            })
            .sort((a, b) => this.ordenarApartamentos(a, b));
    },
    error: (err) => {
        console.error('Erro ao carregar unidades:', err);
    }
    });
}

  ordenarApartamentos(a: string, b: string): number {
    const numA = parseInt(a.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.replace(/\D/g, '')) || 0;
    
    if (numA === numB) return a.localeCompare(b);
    
    return numA - numB;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.cobrancaData.arquivoAnexo = file;
    }
  }

  cadastrarCobranca(): void {
    if (this.cobrancaData.modoDestino === 'Blocos' && this.cobrancaData.blocosSelecionados.length === 0) {
      alert('Selecione pelo menos um Bloco.');
      return;
    }

    if (this.cobrancaData.modoDestino === 'Unidades' && 
       (this.cobrancaData.blocosSelecionados.length === 0 || this.cobrancaData.apartamentosSelecionados.length === 0)) {
      alert('Selecione Bloco e Apartamento.');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('tipo', this.cobrancaData.tipo);
    formData.append('dataVencimento', this.cobrancaData.dataVencimento);
    
    formData.append('valor', this.cobrancaData.valor ? String(this.cobrancaData.valor) : '');
    
    formData.append('modoDestino', this.cobrancaData.modoDestino);
    formData.append('descricao', this.cobrancaData.descricao);

    formData.append('blocosSelecionados', this.cobrancaData.blocosSelecionados.join(','));
    formData.append('apartamentosSelecionados', this.cobrancaData.apartamentosSelecionados.join(','));
    
    if (this.cobrancaData.linkBoleto) {
        formData.append('linkBoleto', this.cobrancaData.linkBoleto);
    }

    if (this.cobrancaData.arquivoAnexo) {
      formData.append('file', this.cobrancaData.arquivoAnexo);
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.post(this.apiUrl, formData, { headers }).subscribe({
      next: (response) => {
        alert('Cobrança cadastrada com sucesso!');
        this.isLoading = false;
        this.limparFormulario();
        this.router.navigate(['/cobrancas']);
      },
      error: (erro) => {
        console.error('Erro no cadastro:', erro); 
        alert('Erro ao cadastrar cobrança. Verifique o console.');
        this.isLoading = false;
      }
    });
  }

  limparFormulario() {
    this.cobrancaData = {
      tipo: '',
      dataVencimento: '',
      valor: null,
      modoDestino: 'Todos',
      blocosSelecionados: [],
      apartamentosSelecionados: [],
      linkBoleto: '',
      arquivoAnexo: null,
      descricao: ''
    };
  }
}