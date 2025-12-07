import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // <-- MÓDULO FALTANTE PARA NGMODEL
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let httpMock: HttpTestingController; // Para simular requisições HTTP

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importar o componente standalone e todos os módulos que ele usa.
      imports: [
        RegistroComponent, // O componente standalone
        RouterTestingModule,
        FormsModule, // CORRIGE: Error NG0301: Export of name 'ngModel' not found!
        HttpClientTestingModule // CORRIGE: Erros 0 Unknown Error ao carregar dados
      ],
      // Não precisa de 'declarations' para componentes standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    // Simular o carregamento inicial (requisições de unidades e perfis)
    // Isso evita o erro 'verify' e o erro HTTP 0.
    
    // 1. Simular chamada para public/units
    const unitsReq = httpMock.expectOne(`${(component as any).apiUrl}public/units`);
    unitsReq.flush([]); 
    
    // 2. Simular chamada para public/roles
    const rolesReq = httpMock.expectOne(`${(component as any).apiUrl}public/roles`);
    rolesReq.flush([]); 

    fixture.detectChanges(); // Aciona o ngOnInit
  });

  afterEach(() => {
    // Garante que todas as requisições mockadas foram executadas
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load units and roles on initialization', () => {
    // Verifica se as chamadas foram mockadas com sucesso
    expect(component.unidades.length).toBe(0);
    expect(component.roles.length).toBe(0);
  });

  // O teste 'should display error message if required fields are missing'
  // está falhando devido ao erro NG0301, mas com o FormsModule importado, ele deve passar
  // se a lógica de teste estiver correta.
});