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
    // 1. Checagem de campos obrigatórios
    if (!this.registroData.fullName || !this.registroData.email || !this.registroData.password ||
        !this.registroData.userType || !this.registroData.bloco || !this.registroData.apartment ||
        !this.registroData.phone ||
        !this.registroData.comprovante) {
      this.isSuccess = false;
      this.registroMessage = 'Preencha todos os campos obrigatórios e anexe o comprovante.';
      return;
    }
    
    // 2. Checagem de Formatos (Adicionado)
    
    // Regex para Senha: Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número.
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
    
    // Regex para Telefone: Formato (XX) XXXXX-XXXX
    const phoneRegex = new RegExp(/^(\([0-9]{2}\)\s?9[0-9]{4}-[0-9]{4}|\([0-9]{2}\)\s?[0-9]{4}-[0-9]{4})$/);

    // Expressão regular de email não é estritamente necessária aqui pois o input[type=email] no HTML já faz uma validação básica.
    // Usaremos a validação do browser/Angular para o email.

    if (!passwordRegex.test(this.registroData.password)) {
      this.isSuccess = false;
      this.registroMessage = 'Senha inválida: mínimo 1 letra maiúscula, 1 minúscula, 1 número e 8 caracteres.';
      return;
    }

    if (!phoneRegex.test(this.registroData.phone)) {
      this.isSuccess = false;
      this.registroMessage = 'Telefone inválido. Formato esperado: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.';
      return;
    }

    // Checagem de formato do Comprovante
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (this.registroData.comprovante) {
      if (!allowedTypes.includes(this.registroData.comprovante.type)) {
        this.isSuccess = false;
        this.registroMessage = 'Formato de comprovante inválido. Use .pdf, .png ou .jpg.';
        return;
      }
    }

    // 3. Envio dos Dados (Original)
    const formData = new FormData();
    formData.append('name', this.registroData.fullName);
    formData.append('email', this.registroData.email);
    formData.append('phone', this.registroData.phone);
    formData.append('role_id', this.registroData.userType);
    formData.append('unit_id', this.registroData.apartment);
    formData.append('password', this.registroData.password);
    formData.append('comprovante', this.registroData.comprovante as File);

    this.http.post(`${this.apiUrl}auth/register`, formData).subscribe({
      next: () => {
        this.isSuccess = true;
        this.registroMessage = 'Cadastro enviado com sucesso! Aguarde a aprovação.';
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