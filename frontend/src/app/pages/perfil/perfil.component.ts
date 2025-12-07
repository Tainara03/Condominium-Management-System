import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../environments/environment';

interface Unidade {
  bloco: string;
  apartment: string;
}

interface Perfil {
  fullName: string;
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

  private apiUrl = `${environment.apiUrl}perfil`;  

  modoEdicao: boolean = false; 
  perfilData: Perfil = this.getInitialProfileData();
  perfilDataOriginal: Perfil = this.getInitialProfileData();
  novaUnidadeTemp: Unidade = { bloco: '', apartment: '' }; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.carregarDadosDoPerfil();
  }
  
  private getInitialProfileData(): Perfil {
      return {
          fullName: '',
          email: '',
          phone: '',
          userType: null,
          userTypeDisplay: 'Carregando...',
          unidades: [],
          novoComprovante: null
      };
  }

  carregarDadosDoPerfil(): void {
    const userType = this.authService.getUserType(); 
    const userTypeValidated = userType || 'Morador'; 
    
    const mockData: Perfil = {
      fullName: 'João da Silva',
      email: 'joao.silva@domus.com',
      phone: '11987654321',
      userType: userTypeValidated,
      userTypeDisplay: this.formatUserType(userTypeValidated),
      unidades: [
        { bloco: 'A', apartment: '101' },
        { bloco: 'C', apartment: '204' } 
      ], 
      novoComprovante: null 
    };

    this.perfilData = { ...mockData };
    this.perfilDataOriginal = { ...mockData };
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
    
    const houveAlteracaoUnidades = JSON.stringify(this.perfilData.unidades) !== JSON.stringify(this.perfilDataOriginal.unidades);
    
    if (houveAlteracaoUnidades && !this.perfilData.novoComprovante) {
        alert('É obrigatório anexar um novo comprovante para alterar/adicionar unidades.');
        return;
    }

    alert('Alterações enviadas para análise. Você será notificado sobre a aprovação.');
    
    this.perfilDataOriginal = JSON.parse(JSON.stringify(this.perfilData));
    this.perfilData.novoComprovante = null;
    this.modoEdicao = false;
  }
  
  private formatUserType(type: string): string {
      switch (type) {
          case 'Admin': return 'Administrador';
          case 'Sindico': return 'Sindico';
          case 'Morador': return 'Morador';
          case 'Funcionario': return 'Funcionario';
          default: return 'Desconhecido';
      }
  }
}