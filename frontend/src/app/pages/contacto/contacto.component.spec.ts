import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoComponent } from './contacto.component';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('Debería cargar el script de google maps si aún no está cargado', () => {
      const rendererSpy = spyOn(component['renderer'], 'createElement').and.callThrough();
      const appendChildSpy = spyOn(component['renderer'], 'appendChild').and.callThrough();
      (window as any).google = undefined; // Simula que Google Maps no está cargado

      component.ngAfterViewInit();

      expect(rendererSpy).toHaveBeenCalledWith('script');
      expect(appendChildSpy).toHaveBeenCalled();
    });

    it('Debería llamar a InitMap si Google Maps ya se ha cargado', () => {
      const initMapSpy = spyOn(component, 'initMap').and.callThrough();
      (window as any).google = {}; // Simula que Google Maps ya está cargado

      component.ngAfterViewInit();

      expect(initMapSpy).toHaveBeenCalled();
    });
  });

  describe('initMap', () => {
    it('Debería inicializar el mapa correctamente', () => {
      const mapElement = document.createElement('div');
      mapElement.id = 'map';
      document.body.appendChild(mapElement);

      const googleMapsMock = {
        Map: jasmine.createSpy().and.returnValue({}),
        Marker: jasmine.createSpy()
      };
      (window as any).google = { maps: googleMapsMock };

      component.initMap();

      expect(googleMapsMock.Map).toHaveBeenCalled();
      expect(googleMapsMock.Marker).toHaveBeenCalled();
    });
  });
});
