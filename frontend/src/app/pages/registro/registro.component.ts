import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Unidade {
  id: string;
  apartment: string;
  building: string;
}

interface ApartamentoOption {
  id: string;
  name: string;
}

interface Role {
  id: string;
  role: string;
  level: number;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}`;

  unidades: Unidade[] = [];
  roles: Role[] = [];

  blocos: string[] = [];
  apartamentos: ApartamentoOption[] = [];

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

  registroMessage = '';
  isSuccess = false;

  constructor(
    private router: Router,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUnidades();
    this.carregarPerfis();
  }

  carregarUnidades(): void {
    this.http.get<Unidade[]>(`${this.apiUrl}public/units`).subscribe({
      next: (res) => {
        this.unidades = res;
        this.blocos = Array.from(new Set(res.map(u => u.building)));
        this.apartamentos = res.map(u => ({ id: u.id, name: u.apartment }));
      },
      error: () => {}
    });
  }

  carregarPerfis(): void {
    this.http.get<Role[]>(`${this.apiUrl}public/roles`).subscribe({
      next: (res) => {
        this.roles = res;
      },
      error: () => {}
    });
  }

  onBlocoChange(): void {
    this.apartamentos = this.unidades
      .filter(u => u.building === this.registroData.bloco)
      .map(u => ({ id: u.id, name: u.apartment }));

    this.registroData.apartment = '';
  }

  onApartmentChange(): void {
    const unidade = this.unidades.find(u => u.id === this.registroData.apartment);
    if (unidade) {
      this.registroData.bloco = unidade.building;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.registroData.comprovante = input.files[0];
    }
  }

  registrar(): void {
    if (!this.registroData.fullName || !this.registroData.email || !this.registroData.password ||
        !this.registroData.userType || !this.registroData.bloco || !this.registroData.apartment ||
        !this.registroData.phone || // <--- Telefone (phone) agora é obrigatório na validação TS
        !this.registroData.comprovante) {
      this.isSuccess = false;
      this.registroMessage = 'Preencha todos os campos obrigatórios e anexe o comprovante.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.registroData.fullName);
    formData.append('email', this.registroData.email);
    formData.append('phone', this.registroData.phone);
    formData.append('role_id', this.registroData.userType);
    formData.append('unit_id', this.registroData.apartment);
    formData.append('password', this.registroData.password);
    formData.append('comprovante', this.registroData.comprovante as File); // Assertiva de tipo
    
    this.http.post(`${this.apiUrl}auth/register`, formData).subscribe({
      next: () => {
        this.isSuccess = true;
        this.registroMessage = 'Cadastro enviado com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        if (err.status === 400) {
          this.isSuccess = false;
          this.registroMessage = 'Unidade não cadastrada.';
        } else {
          this.isSuccess = false;
          this.registroMessage = err.error?.message || 'Erro ao registrar usuário.';
        }
      }
    });
  }
}