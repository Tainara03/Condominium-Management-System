import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // ⬅️ ESSENCIAL PARA NGMODEL
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let httpMock: HttpTestingController;

  // Use um beforeEach síncrono para setup rápido
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importar o componente standalone e todos os módulos de dependência do template.
      imports: [
        RegistroComponent, // O componente standalone
        RouterTestingModule,
        FormsModule, // CORREÇÃO PRINCIPAL para NG0301
        HttpClientTestingModule
      ],
    }).compileComponents();
  });

  // Novo bloco beforeEach para inicialização e simulação de chamadas
  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    // 1. Simular chamada para public/units
    // É seguro usar 'any' ou a URL completa, mas usar a URL relativa pode ser mais robusto.
    // Baseado no seu código, a URL seria 'ambiente.apiUrl' + 'public/units'.
    const unitsReq = httpMock.expectOne((req) => req.url.includes('public/units'));
    unitsReq.flush([]); // Simula resposta de sucesso com array vazio
    
    // 2. Simular chamada para public/roles
    const rolesReq = httpMock.expectOne((req) => req.url.includes('public/roles'));
    rolesReq.flush([]); // Simula resposta de sucesso com array vazio

    fixture.detectChanges(); // Aciona o ngOnInit e a renderização do template
  });

  afterEach(() => {
    // Garante que todas as requisições mockadas foram executadas
    // Este `httpMock.verify()` falhava antes devido ao erro NG0301 que impedia o setup completo.
    httpMock.verify();
  });

  // --- Testes ---

  it('should create', () => {
    // Testa se o componente foi criado após a injeção de dependências e setup
    expect(component).toBeTruthy();
  });
  
  it('should load units and roles on initialization', () => {
    // Testa se as chamadas de API foram feitas e mockadas
    expect(component.unidades.length).toBe(0);
    expect(component.roles.length).toBe(0);
  });
  
  // Exemplo de teste da lógica de validação
  it('should prevent registration if required fields are missing', () => {
    // Define apenas um campo para forçar a falha na validação
    component.registroData.fullName = 'Test User'; 
    component.registroData.email = 'test@example.com';
    
    // Como os outros campos estão vazios, o método registrar deve falhar na validação inicial.
    component.registrar();
    
    expect(component.isSuccess).toBe(false);
    expect(component.registroMessage).toBe('Preencha todos os campos obrigatórios e anexe o comprovante.');
  });
});