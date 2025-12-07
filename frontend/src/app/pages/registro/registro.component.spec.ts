import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // ⬅️ Essencial para resolver o erro NG0301
import { CommonModule } from '@angular/common'; // ⬅️ Essencial para diretivas (*ngIf, *ngFor)
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importa o componente standalone e todas as suas dependências.
      imports: [
        RegistroComponent, // Componente standalone
        RouterTestingModule,
        FormsModule,
        CommonModule,
        HttpClientTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    // Mock das chamadas do ngOnInit para evitar erros HTTP no teste:
    
    // 1. Simular chamada para public/units
    const unitsReq = httpMock.expectOne((req) => req.url.includes('public/units'));
    unitsReq.flush([]); 
    
    // 2. Simular chamada para public/roles
    const rolesReq = httpMock.expectOne((req) => req.url.includes('public/roles'));
    rolesReq.flush([]); 

    fixture.detectChanges(); // Aciona o ngOnInit e a renderização do template
  });

  afterEach(() => {
    // Garante que todas as requisições mockadas foram executadas
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load units and roles on initialization', () => {
    expect(component.unidades.length).toBe(0);
    expect(component.roles.length).toBe(0);
  });
  
  it('should prevent registration if required fields are missing', () => {
    // Testa a lógica de validação do componente
    component.registroData.fullName = 'Test User'; 
    component.registroData.email = 'test@example.com';
    
    component.registrar();
    
    expect(component.isSuccess).toBe(false);
    expect(component.registroMessage).toBe('Preencha todos os campos obrigatórios e anexe o comprovante.');
  });
});