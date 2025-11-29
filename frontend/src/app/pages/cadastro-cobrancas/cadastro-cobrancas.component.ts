import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cadastro-cobrancas',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './cadastro-cobrancas.component.html',
    styleUrls: ['./cadastro-cobrancas.component.css']
})
export class CadastroCobrancasComponent {
    
    cobrancaData = {
        tipo: '',
        dataVencimento: '',
        valor: 0,
        modoDestino: 'Todos',
        blocosSelecionados: [] as string[],
        apartamentosSelecionados: [] as string[],
        linkBoleto: '',
        arquivoAnexo: null as File | null,
        descricao: ''
    };

    constructor() {}

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (file) {
            this.cobrancaData.arquivoAnexo = file;
        }
    }

    cadastrarCobranca(): void {
      
        if (this.cobrancaData.modoDestino === 'Blocos' && this.cobrancaData.blocosSelecionados.length === 0) {
            alert('Selecione pelo menos um Bloco para o lançamento em Bloco Múltiplo.');
            return;
        }

        if (this.cobrancaData.modoDestino === 'Unidades' && 
            (this.cobrancaData.blocosSelecionados.length === 0 || this.cobrancaData.apartamentosSelecionados.length === 0)) {
            alert('Selecione pelo menos um Bloco E pelo menos um Apartamento para o lançamento específico.');
            return;
        }
        
        let destino: string;
        
        switch (this.cobrancaData.modoDestino) {
            case 'Todos':
                destino = 'Todas as unidades do condomínio.';
                break;
            case 'Blocos':
                destino = `Todos os apartamentos nos Blocos: ${this.cobrancaData.blocosSelecionados.join(', ')}.`;
                break;
            case 'Unidades':
                destino = `Unidades específicas nos Blocos: ${this.cobrancaData.blocosSelecionados.join(', ')} e Aptos: ${this.cobrancaData.apartamentosSelecionados.join(', ')}.`;
                break;
            default:
                destino = 'Erro de Destino';
        }
        
        console.log(`Cobrança de ${this.cobrancaData.valor} (${this.cobrancaData.tipo}) lançada para: ${destino}`);
        alert('Cobrança registrada com sucesso!');
    }
}