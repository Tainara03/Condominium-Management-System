import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient,  } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-cadastro-cobrancas',
    standalone: true,
    imports: [FormsModule, CommonModule, HttpClient, HttpClientModule],
    templateUrl: './cadastro-cobrancas.component.html',
    styleUrls: ['./cadastro-cobrancas.component.css']
})
export class CadastroCobrancasComponent {
    private apiUrl = 'http://localhost:3000/cobrancas'; 
    isLoading = false; 

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

    constructor(private http: HttpClient) { }

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
        Object.keys(this.cobrancaData).forEach(key => {
            const valor = (this.cobrancaData as any)[key];
            if (key !== 'arquivoAnexo' && valor !== null) {
                formData.append(key, valor.toString());
            }
        });

        if (this.cobrancaData.arquivoAnexo) {
            formData.append('file', this.cobrancaData.arquivoAnexo);
        }

        this.http.post(this.apiUrl, formData).subscribe({
            next: (response) => {
                alert('Cobrança cadastrada com sucesso!');
                this.limparFormulario();
                this.isLoading = false;
            },
            error: (erro) => {
                console.error(erro); 
                alert('Erro ao conectar com o Backend!');
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