import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // O componente é standalone, então ele deve ser importado.
      // E todos os módulos que ele usa no template ou no código (FormsModule, HttpClientModule)
      // devem ser simulados/importados aqui.
      imports: [
        RegistroComponent,
        RouterTestingModule,
        FormsModule, // Necessário para [(ngModel)] e #variável="ngModel"
        HttpClientTestingModule // Necessário para simular requisições HTTP
      ],
      // Não é necessário 'declarations' para componentes standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    // Simular o carregamento inicial de unidades e perfis (roles)
    // para evitar erros de requisição durante a criação do componente.
    const unitsReq = httpMock.expectOne('http://localhost:3000/api/public/units');
    unitsReq.flush([]); // Simula resposta vazia para unidades
    
    const rolesReq = httpMock.expectOne('http://localhost:3000/api/public/roles');
    rolesReq.flush([]); // Simula resposta vazia para perfis

    fixture.detectChanges(); // Executa ngOnInit
  });

  afterEach(() => {
    // Verifica se não há requisições pendentes que não foram tratadas
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load units and roles on initialization', () => {
    // Apenas verifica que as chamadas HTTP foram feitas (já verificadas no beforeEach)
    expect(component.unidades.length).toBe(0);
    expect(component.roles.length).toBe(0);
  });
  
  // Exemplo de teste para a lógica de validação
  it('should display error message if required fields are missing', () => {
    // Não preenche nenhum campo obrigatório
    component.registroData.fullName = ''; 
    fixture.detectChanges();
    
    component.registrar();
    
    expect(component.isSuccess).toBe(false);
    expect(component.registroMessage).toBe('Preencha todos os campos obrigatórios e anexe o comprovante.');
  });
});