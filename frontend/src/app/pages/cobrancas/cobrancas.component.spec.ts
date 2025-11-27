import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrancasComponent } from './cobrancas.component';

describe('CobrancasComponent', () => {
  let component: CobrancasComponent;
  let fixture: ComponentFixture<CobrancasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobrancasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobrancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
