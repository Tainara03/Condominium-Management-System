import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Unidade {
  bloco: string;
  apartment: string;
}

interface Perfil {
  id?: string;
  name: string;
  email: string;
  phone: string;
  userType: 'Admin' | 'Sindico' | 'Morador' | 'Funcionario' | null;
  userTypeDisplay: string;
  unidades: Unidade[];
  novoComprovante: File | null;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private apiUrl = `${environment.apiUrl}users/`;  
  modoEdicao: boolean = false; 
  perfilData: Perfil = this.getInitialProfileData();
  perfilDataOriginal: Perfil = this.getInitialProfileData();
  novaUnidadeTemp: Unidade = { bloco: '', apartment: '' }; 

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarDadosDoPerfil();
  }
  
  private getInitialProfileData(): Perfil {
    return {
      name: '',
      email: '',
      phone: '',
      userType: null,
      userTypeDisplay: 'Carregando...',
      unidades: [],
      novoComprovante: null
    };
  }

  carregarDadosDoPerfil(): void {
    const userId = this.authService.getUserId();

    this.http.get<Perfil>(`${this.apiUrl}?id=${userId}`).subscribe({
      next: (data) => {
        this.perfilData = { ...data, novoComprovante: null };
        this.perfilDataOriginal = JSON.parse(JSON.stringify(this.perfilData));
      },
      error: (err) => {
        console.error('Erro ao carregar perfil:', err);
        alert('Não foi possível carregar os dados do perfil.');
      }
    });
  }
  
  onComprovanteSelected(event: any): void {
    const file: File = event.target.files[0];
    this.perfilData.novoComprovante = file;
  }

  adicionarUnidade(): void {
    if (this.novaUnidadeTemp.bloco && this.novaUnidadeTemp.apartment) {
      this.perfilData.unidades.push({ ...this.novaUnidadeTemp });
      this.novaUnidadeTemp = { bloco: '', apartment: '' };
    } else {
      alert('Por favor, preencha Bloco e Apartamento.');
    }
  }

  removerUnidade(index: number): void {
    if (this.perfilData.unidades.length > 1) {
      this.perfilData.unidades.splice(index, 1);
      alert('Unidade marcada para remoção. Salve para confirmar.');
    } else {
      alert('Você deve ter pelo menos uma unidade registrada.');
    }
  }

  alternarModoEdicao(): void {
    this.modoEdicao = !this.modoEdicao;
  }
  
  cancelarEdicao(): void {
    this.perfilData = JSON.parse(JSON.stringify(this.perfilDataOriginal));
    this.modoEdicao = false;
  }

  salvarPerfil(): void {
    if (!this.modoEdicao) return;

    let request: any;
    const userType = this.authService.getUserType();

    if (this.perfilData.novoComprovante) {
      const formData = new FormData();
      formData.append('name', this.perfilData.name);
      formData.append('email', this.perfilData.email);
      formData.append('phone', this.perfilData.phone);
      formData.append('unidades', JSON.stringify(this.perfilData.unidades));
      formData.append('comprovante', this.perfilData.novoComprovante); 
      formData.append('userType', userType ?? 'Morador');
      request = formData;
    } else {
      request = {
        name: this.perfilData.name,
        email: this.perfilData.email,
        phone: this.perfilData.phone,
        unidades: this.perfilData.unidades,
        userType: userType ?? 'Morador'
      };
    }

    this.http.put(`${this.apiUrl}${this.perfilData.id}`, request).subscribe({
      next: (res: any) => {
        alert('Alterações enviadas para análise.');
        this.perfilDataOriginal = JSON.parse(JSON.stringify(this.perfilData));
        this.perfilData.novoComprovante = null;
        this.modoEdicao = false;
      },
      error: (err) => {
        console.error('Erro ao salvar perfil:', err);
        if (err.status === 409) alert('Email já está em uso.');
        else alert('Erro ao salvar alterações.');
      }
    });
  }
}
