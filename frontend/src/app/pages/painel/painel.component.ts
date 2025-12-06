import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Unidade {
  id: string;
  apartment: string;
  building: string;
}

interface Usuario {
  id: string;
  bloco: string;
  apartamento: string;
  name: string;
  tipoUsuario: string;
  email: string;
  phone: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  comprovante_path?: string;
}

interface Filtros {
  name: string;
  bloco: string;
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

  unidades: Unidade[] = [];
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

  filtros: Filtros = { name: '', bloco: '', status: '', tipoUsuario: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.http.get<Usuario[]>(`${this.apiUrl}users`).subscribe({
      next: (res) => {
        this.usuarios = res.map(u => ({ ...u }));
        this.aplicarFiltros();
      },
      error: (err) => console.error('Erro ao carregar usuários', err)
    });
  }

  aplicarFiltros(): void {
    let tempUsuarios = this.usuarios;

    if (this.filtros.name) {
      const termo = this.filtros.name.toLowerCase();
      tempUsuarios = tempUsuarios.filter(u => u.name.toLowerCase().includes(termo));
    }
    if (this.filtros.bloco) tempUsuarios = tempUsuarios.filter(u => u.bloco === this.filtros.bloco);
    if (this.filtros.status) tempUsuarios = tempUsuarios.filter(u => u.status === this.filtros.status);
    if (this.filtros.tipoUsuario) tempUsuarios = tempUsuarios.filter(u => u.tipoUsuario === this.filtros.tipoUsuario);

    this.usuariosFiltrados = tempUsuarios;
  }

  resetarFiltros(): void {
    this.filtros = { name: '', bloco: '', status: '', tipoUsuario: '' };
    this.aplicarFiltros();
  }

  aprovarUsuario(usuario: Usuario): void {
    this.http.post(`${this.apiUrl}users/${usuario.id}/approve`, {}).subscribe({
      next: () => {
        usuario.status = 'Ativo';
        this.aplicarFiltros();
      },
      error: (err) => console.error('Erro ao aprovar usuário', err)
    });
  }

  reprovarUsuario(usuario: Usuario): void {
    this.http.post(`${this.apiUrl}users/${usuario.id}/reject`, {}).subscribe({
      next: () => {
        usuario.status = 'Inativo';
        this.aplicarFiltros();
      },
      error: (err) => console.error('Erro ao reprovar usuário', err)
    });
  }

  toggleStatus(usuario: Usuario): void {
    if (usuario.status === 'Pendente') return;
    const novoStatus = usuario.status === 'Ativo' ? 'Inativo' : 'Ativo';

    this.http.post(`${this.apiUrl}users/${usuario.id}/status`, { status: novoStatus }).subscribe({
      next: () => {
        usuario.status = novoStatus;
        this.aplicarFiltros();
      },
      error: (err) => console.error('Erro ao alterar status do usuário', err)
    });
  }

  baixarComprovante(usuario: Usuario): void {
    if (!usuario.comprovante_path) return;

    const url = `${this.apiUrl}users/${usuario.id}/comprovante`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        const fileUrl = window.URL.createObjectURL(blob);
        link.href = fileUrl;
        link.download = `comprovante-${usuario.name}.pdf`;
        link.click();
        window.URL.revokeObjectURL(fileUrl);
      },
      error: (err) => console.error('Erro ao baixar comprovante', err)
    });
  }
}
