import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

interface Usuario {
    bloco: string;
    apartamento: string;
    nome: string;
    tipoUsuario: string;
    email: string;
    telefone: string;
    status: 'Ativo' | 'Inativo' | 'Pendente';
}

interface Filtros {
    nome: string;
    bloco: string;
    status: 'Ativo' | 'Inativo' | 'Pendente' | '';
    tipoUsuario: string;
}

@Component({
    selector: 'app-painel',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './painel.component.html',
    styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

    private apiUrl = `${environment.apiUrl}painel`;  

    usuarios: Usuario[] = [];
    usuariosFiltrados: Usuario[] = [];
    
    filtros: Filtros = {
        nome: '',
        bloco: '',
        status: '',
        tipoUsuario: ''
    };

    ngOnInit(): void {
        this.carregarUsuarios();
    }

    carregarUsuarios(): void {
        const dadosIniciais: Usuario[] = [
            { bloco: 'A', apartamento: '101', nome: 'João da Silva', tipoUsuario: 'Morador', email: 'joao@domus.com', telefone: '11987654321', status: 'Ativo' },
            { bloco: 'B', apartamento: '203', nome: 'Maria Souza', tipoUsuario: 'funcionario', email: 'maria@domus.com', telefone: '21912345678', status: 'Inativo' },
            { bloco: 'C', apartamento: '304', nome: 'Pedro Lima', tipoUsuario: 'Morador', email: 'pedro@domus.com', telefone: '11999998888', status: 'Pendente' },
        ];
        this.usuarios = dadosIniciais;
        this.aplicarFiltros(); 
    }

    aplicarFiltros(): void {
        let tempUsuarios = this.usuarios;
        
        if (this.filtros.nome) {
            const termo = this.filtros.nome.toLowerCase();
            tempUsuarios = tempUsuarios.filter(u => u.nome.toLowerCase().includes(termo));
        }
        
        if (this.filtros.bloco) {
            tempUsuarios = tempUsuarios.filter(u => u.bloco === this.filtros.bloco);
        }
        
        if (this.filtros.status) {
            // O filtro funciona corretamente porque u.status é do tipo literal e this.filtros.status agora inclui a string vazia
            tempUsuarios = tempUsuarios.filter(u => u.status === this.filtros.status);
        }
        
        if (this.filtros.tipoUsuario) {
            tempUsuarios = tempUsuarios.filter(u => u.tipoUsuario === this.filtros.tipoUsuario);
        }
        
        this.usuariosFiltrados = tempUsuarios;
    }
    
    resetarFiltros(): void {
        this.filtros = { nome: '', bloco: '', status: '', tipoUsuario: '' };
        this.aplicarFiltros();
    }

    aprovarUsuario(usuario: Usuario): void {
        usuario.status = 'Ativo';
        this.aplicarFiltros(); 
        alert(`Usuário ${usuario.nome} aprovado e ativado.`);
    }

    reprovarUsuario(usuario: Usuario): void {
        usuario.status = 'Inativo';
        this.aplicarFiltros();
        alert(`Usuário ${usuario.nome} reprovado e desativado.`);
    }

    toggleStatus(usuario: Usuario): void {
        if (usuario.status === 'Pendente') return; 
        
        const novoStatus = usuario.status === 'Ativo' ? 'Inativo' : 'Ativo';
        usuario.status = novoStatus;
        this.aplicarFiltros();
        alert(`Usuário ${usuario.nome} está agora como ${novoStatus}.`);
    }
}