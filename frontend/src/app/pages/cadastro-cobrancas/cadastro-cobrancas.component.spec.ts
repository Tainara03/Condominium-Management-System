import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCobrancasComponent } from './cadastro-cobrancas.component';

describe('CadastroCobrancasComponent', () => {
  let component: CadastroCobrancasComponent;
  let fixture: ComponentFixture<CadastroCobrancasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCobrancasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCobrancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
