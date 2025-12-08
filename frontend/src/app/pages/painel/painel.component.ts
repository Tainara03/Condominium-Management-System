import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Unidade {
  apartment: string;
  bloco: string;
}

interface Usuario {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  comprovante_path?: string;

  unidades: Unidade[];
  userTypeDisplay: string;

  bloco: string;
  apartamento: string;
  tipoUsuario: string;
}

interface Filtros {
  name: string;
  bloco: string;
  apartamento: string;
  status: 'Ativo' | 'Inativo' | 'Pendente' | '';
  tipoUsuario: string;
}

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  private apiUrl = environment.apiUrl;

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

  filtros: Filtros = {
    name: '',
    bloco: '',
    apartamento: '',
    status: '',
    tipoUsuario: ''
  };

  blocosDisponiveis: string[] = [];
  tiposDisponiveis: string[] = [];
  statusDisponiveis: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.http.get<Usuario[]>(`${this.apiUrl}users`).subscribe({
      next: (res) => {

        this.usuarios = res.map(u => ({
          ...u,
          bloco: u.unidades?.[0]?.bloco ?? '',
          apartamento: u.unidades?.[0]?.apartment ?? '',
          tipoUsuario: u.userTypeDisplay ?? ''
        }));

        this.blocosDisponiveis = [
          ...new Set(this.usuarios.map(u => u.bloco).filter(v => !!v))
        ];

        this.tiposDisponiveis = [
          ...new Set(this.usuarios.map(u => u.tipoUsuario).filter(v => !!v))
        ];

        this.statusDisponiveis = [
          ...new Set(this.usuarios.map(u => u.status).filter(v => !!v))
        ];

        this.aplicarFiltros();
      },
      error: (err) => console.error('Erro ao carregar usuários', err)
    });
  }

  aplicarFiltros(): void {
    let temp = this.usuarios;

    if (this.filtros.name) {
      const termo = this.filtros.name.toLowerCase();
      temp = temp.filter(u => u.name.toLowerCase().includes(termo));
    }

    if (this.filtros.bloco) {
      temp = temp.filter(u => u.bloco === this.filtros.bloco);
    }

    if (this.filtros.apartamento) {
      const termo = this.filtros.apartamento.toLowerCase();
      temp = temp.filter(u => u.apartamento.toLowerCase().includes(termo));
    }

    if (this.filtros.status) {
      temp = temp.filter(u => u.status === this.filtros.status);
    }

    if (this.filtros.tipoUsuario) {
      temp = temp.filter(u => u.tipoUsuario === this.filtros.tipoUsuario);
    }

    this.usuariosFiltrados = temp;
  }

  resetarFiltros(): void {
    this.filtros = { name: '', bloco: '', apartamento: '', status: '', tipoUsuario: '' };
    this.aplicarFiltros();
  }

  aprovarUsuario(usuario: Usuario): void {
    this.http.post(`${this.apiUrl}users/${usuario.id}/approve`, {}).subscribe({
      next: () => {
        usuario.status = 'Ativo';
        this.aplicarFiltros();
      }
    });
  }

  reprovarUsuario(usuario: Usuario): void {
    this.http.delete(`${this.apiUrl}users/${usuario.id}`).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
        this.aplicarFiltros();
      }
    });
  }

  toggleStatus(usuario: Usuario): void {
    if (usuario.status === 'Pendente') return;

    const novoStatus = usuario.status === 'Ativo' ? 'Inativo' : 'Ativo';

    this.http.post(`${this.apiUrl}users/${usuario.id}/status`, { status: novoStatus }).subscribe({
      next: () => {
        usuario.status = novoStatus;
        this.aplicarFiltros();
      }
    });
  }

  baixarComprovante(usuario: Usuario): void {
    if (!usuario.comprovante_path) return;

    const url = `${this.apiUrl}users/${usuario.id}/comprovante`;

    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      const fileUrl = window.URL.createObjectURL(blob);

      link.href = fileUrl;
      link.download = `comprovante-${usuario.name}.pdf`;
      link.click();

      window.URL.revokeObjectURL(fileUrl);
    });
  }
}
