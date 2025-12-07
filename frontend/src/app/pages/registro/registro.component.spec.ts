import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; // ⬅️ ADICIONAR ESTA IMPORTAÇÃO
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistroComponent, // O componente standalone
        RouterTestingModule,
        FormsModule,
        CommonModule, // ⬅️ CORRIGE PROBLEMAS DE DEPENDÊNCIA DE DIRETIVAS (e.g., *ngIf, *ngFor)
        HttpClientTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    // Simular chamadas HTTP de inicialização
    // A simulação das chamadas deve usar o ambiente de teste, assumindo que `apiUrl`
    // é simulado para ser 'http://localhost:3000/api/'
    
    // 1. Simular chamada para public/units
    const unitsReq = httpMock.expectOne((req) => req.url.includes('public/units'));
    unitsReq.flush([]); 
    
    // 2. Simular chamada para public/roles
    const rolesReq = httpMock.expectOne((req) => req.url.includes('public/roles'));
    rolesReq.flush([]); 

    fixture.detectChanges(); // Aciona o ngOnInit
  });

  afterEach(() => {
    httpMock.verify();
  });

  // --- Testes ---

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load units and roles on initialization', () => {
    expect(component.unidades.length).toBe(0);
    expect(component.roles.length).toBe(0);
  });
  
  it('should prevent registration if required fields are missing', () => {
    component.registroData.fullName = 'Test User'; 
    component.registroData.email = 'test@example.com';
    
    component.registrar();
    
    expect(component.isSuccess).toBe(false);
    expect(component.registroMessage).toBe('Preencha todos os campos obrigatórios e anexe o comprovante.');
  });
});