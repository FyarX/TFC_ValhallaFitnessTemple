import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('No debería de enviar el formulario si este no es válido', () => {
      spyOn(component["auth"], 'login');
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['password'].setValue('');
      component.onSubmit();
      expect(component["auth"].login).not.toHaveBeenCalled();
    });

    it('Debería de llamar al servicio de autenticación si el formulario es válido', () => {
      spyOn(component["auth"], 'login').and.returnValue({
        subscribe: (callback: any) => callback({}) // Simula respuesta exitosa
      });
      component.loginForm.controls['email'].setValue('prueba');
      component.loginForm.controls['password'].setValue('123456');
      component.loginForm.controls['remember'].setValue(true);
      component.onSubmit();

      expect(component["auth"].login).toHaveBeenCalledWith({ email: 'prueba', password: '123456' });
      expect(document.cookie).toContain('email=prueba');

    });
  });

  describe('getCookie', () => {
    it('Debería de retornar el valor de la cookie si existe', () => {
      document.cookie = 'email=prueba; path=/';
      const cookieValue = component.getCookie('email');
      expect(cookieValue).toBe('prueba');
    });

    it('Debería de retornar undefined si la cookie no existe', () => {
      const cookieValue = component.getCookie('email');
      expect(cookieValue).toBeUndefined();
    });
  });
});
