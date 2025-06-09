import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ClasesComponent } from './clases.component';

describe('ClasesComponent', () => {
  let component: ClasesComponent;
  let fixture: ComponentFixture<ClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasesComponent, HttpClient],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getImageUrl', () => {
    it('Debería devolver la URL correcta si se selecciona una clase determinada', () => {
      const url = component.getImageUrl('Spinning');
      expect(url).toBe('assets/img/clases_img/spinning.jpg');
    });

    it('Debería devolver una imagen predeterminada si la clase no está registrada', () => {
      const url = component.getImageUrl('UnknownClass');
      expect(url).toBe('assets/img/clases_img/default.jpg');
    });
  });

  describe('apuntarse', () => {
    it('Debería mostrar un error si el usuario no está autenticado', () => {
      spyOn(component["auth"], 'getUserId').and.returnValue(null);
      spyOn(component["toastr"], 'error');

      component.apuntarse({ id: 1, fecha: new Date() } as any);

      expect(component["toastr"].error).toHaveBeenCalledWith('Debes iniciar sesión para apuntarte a una clase.');
    });

    it('Debería llamar al servicio de clase para apuntarse si el usuario está autenticado', () => {
      spyOn(component["auth"], 'getUserId').and.returnValue(1);
      spyOn(component["claseService"], 'apuntarse' as any).and.callThrough();

      component.apuntarse({ id: 1, fecha: new Date() } as any);

      expect(component["claseService"]).toHaveBeenCalledWith(1, 1);
    });
  });

  describe('isAdmin', () => {
    it('Debería devolver true si el usuario es administrador', () => {
      spyOn(component["auth"], 'isAdmin' as any).and.returnValue(true);
      expect(component.isAdmin()).toBeTrue();
    });

    it('Debería devolver false si el usuario no es administrador', () => {
      spyOn(component["auth"], 'isAdmin' as any).and.returnValue(false);
      expect(component.isAdmin()).toBeFalse();
    });
  })
});
