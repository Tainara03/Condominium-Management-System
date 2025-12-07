import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let httpMock: HttpTestingController;

  // Defina a URL base esperada, assumindo que seja 'http://localhost:3000/api/'
  const MOCK_API_URL = 'http://localhost:3000/api/';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistroComponent, 
        RouterTestingModule,
        FormsModule,
        CommonModule,
        HttpClientTestingModule
      ],
      // Adicionar providers para simular o valor de environment.apiUrl no componente
      providers: [
        {
          provide: 'environment', // Token de provisão (dependendo de como environment é injetado)
          useValue: { apiUrl: MOCK_API_URL }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    // 1. Simular chamada para public/units
    const unitsReq = httpMock.expectOne(`${MOCK_API_URL}public/units`); // ⬅️ Usando a URL completa
    unitsReq.flush([]); 
    
    // 2. Simular chamada para public/roles
    const rolesReq = httpMock.expectOne(`${MOCK_API_URL}public/roles`); // ⬅️ Usando a URL completa
    rolesReq.flush([]); 

    fixture.detectChanges(); // Aciona o ngOnInit e a renderização
  });

  afterEach(() => {
    httpMock.verify(); // Esta linha agora deve passar
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load units and roles on initialization', () => {
    expect(component.unidades.length).toBe(0);
    expect(component.roles.length).toBe(0);
  });
  
  // O teste 'should prevent registration if required fields are missing' deve funcionar agora que a renderização é estável.
  it('should prevent registration if required fields are missing', () => {
    component.registroData.fullName = 'Test User'; 
    component.registroData.email = 'test@example.com';
    
    component.registrar();
    
    expect(component.isSuccess).toBe(false);
    expect(component.registroMessage).toBe('Preencha todos os campos obrigatórios e anexe o comprovante.');
  });
});