import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaComponent } from './tienda.component';

describe('TiendaComponent', () => {
  let component: TiendaComponent;
  let fixture: ComponentFixture<TiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiendaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isAdmin', () => {
    it('Debería devolver true si el rol del usuario es admin', () => {
      component.userRole = 'admin'; // Simula que el usuario es administrador
      expect(component.isAdmin()).toBeTrue();
    });
  });
});
