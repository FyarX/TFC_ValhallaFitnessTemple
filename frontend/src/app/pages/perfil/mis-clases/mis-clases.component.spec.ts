import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReservasComponent } from './mis-clases.component';

describe('MisClasesComponent', () => {
  let component: MisReservasComponent;
  let fixture: ComponentFixture<MisReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancelarReserva', () => {
    it('Debería cancelar una reserva y eliminarla de la lista', () => {
      const mockReserva = {
        id: '1',
        clase: {
          id: 'clase1',
          fecha: new Date(Date.now() + 10000) // Fecha futura
        }
      } as any;

      spyOn(component['auth'], 'getUserId').and.returnValue('usuario1');
      spyOn(component['reservaService'], 'cancelarReserva').and.returnValue({
        subscribe: (callback: any) => callback() // Simula respuesta exitosa
      });

      spyOn(component['toastr'], 'success');
      spyOn(component['toastr'], 'error');
      

      component.cancelarReserva(mockReserva);

      expect(component['reservaService'].cancelarReserva).toHaveBeenCalledWith('usuario1' as any, 'clase1' as any);
      expect(component.reservas).not.toContain(mockReserva);
    });

    it('Debería mostrar un error si no se puede cancelar la reserva', () => {
      const mockReserva = {
        id: '1',
        clase: {
          id: 'clase1',
          fecha: new Date(Date.now() + 10000) // Fecha futura
        }
      } as any;

      spyOn(component['auth'], 'getUserId').and.returnValue('usuario1');
      spyOn(component['reservaService'], 'cancelarReserva').and.returnValue({
        subscribe: (errorCallback: any) => errorCallback() // Simula error
      });

      spyOn(component['toastr'], 'success');
      spyOn(component['toastr'], 'error');

      component.cancelarReserva(mockReserva);

      expect(component['toastr'].error).toHaveBeenCalledWith('Error al cancelar la reserva. Inténtalo de nuevo más tarde.');
    });
  });
});
