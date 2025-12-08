import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistroComponent', () => {
  let fixture: ComponentFixture<RegistroComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(RegistroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); 
  });
});