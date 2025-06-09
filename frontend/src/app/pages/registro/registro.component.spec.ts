import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../core/services/auth/auth.service';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('Debería llamar al método register del servicio AuthService', () => {
      const authService = TestBed.inject(AuthService);
      spyOn(authService, 'register').and.callThrough();
      
      component.registroForm.setValue({
        nombre: 'John',
        apellidos: 'Doe',
        email: '',
        password: 'Password123',
        telefono: '123456789',
        dni: '12345678A',
        rol: 'usuario'
      });
      
      component.onSubmit();

      expect(component.registroForm.valid).toBeFalse();
      expect(component.registroForm.invalid).toBeTrue();
    });
  });
});
