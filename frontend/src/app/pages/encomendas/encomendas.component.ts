import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

interface Unidade {
  id: string;
  building: string;
  apartment: string;
}

interface ApartamentoOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-encomendas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './encomendas.component.html',
  styleUrls: ['./encomendas.component.css']
})
export class EncomendasComponent implements OnInit {

  private apiUrl = environment.apiUrl;

  blocos: string[] = [];
  apartamentos: ApartamentoOption[] = [];
  unidades: Unidade[] = [];

  selectedBloco: string = '';
  selectedUnidade: string = '';
  dataHora: string = '';
  descricao: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.carregarUnidades();
  }

  carregarUnidades(): void {
    this.http.get<Unidade[]>(`${this.apiUrl}public/units`).subscribe({
      next: (res) => {
        this.unidades = res;
        this.blocos = Array.from(new Set(res.map(u => u.building)));
        this.apartamentos = res.map(u => ({ id: u.id, name: u.apartment }));
      },
      error: (err) => console.error('Erro ao carregar unidades', err)
    });
  }

  onBlocoChange(): void {
    this.apartamentos = this.unidades
      .filter(u => u.building === this.selectedBloco)
      .map(u => ({ id: u.id, name: u.apartment }));

    this.selectedUnidade = '';
  }

  onApartmentChange(): void {
    const unidade = this.unidades.find(u => u.id === this.selectedUnidade);
    if (unidade) {
      this.selectedBloco = unidade.building;
    }
  }

  getApartamentos(): Unidade[] {
    if (!this.selectedBloco) return [];
    return this.unidades.filter(u => u.building === this.selectedBloco);
  }

  registrarEncomenda(): void {
    if (!this.selectedBloco || !this.selectedUnidade || !this.dataHora || !this.descricao) {
      alert('Preencha todos os campos!');
      return;
    }

    const payload = {
      unit_id: this.selectedUnidade,
      received_at: this.dataHora,
      description: this.descricao
    };

    console.log('Payload da encomenda:', payload);

    this.http.post(`${this.apiUrl}packages`, payload).subscribe({
      next: () => {
        alert('Encomenda registrada com sucesso!');
        this.resetarFormulario();
      },
      error: (err) => {
        console.error('Erro ao registrar encomenda', err);
        alert('Falha ao registrar encomenda.');
      }
    });
  }

  resetarFormulario(): void {
    this.selectedBloco = '';
    this.selectedUnidade = '';
    this.dataHora = '';
    this.descricao = '';
  }
}
