import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

declare var google: any;
interface Window {
  initMap: () => void;
}
declare let window: Window;

@Component({
  selector: 'app-contacto',
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})

export class ContactoComponent implements AfterViewInit {

  public email = 'valhallaft@gmail.com'

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Evita múltiples cargas si ya existe
    if (!(window as any).google) {
      const script = this.renderer.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key={environment.googleMapsApiKey}&callback=initMap';
      script.async = true;
      script.defer = true;
      this.renderer.appendChild(document.body, script);
      (window as any).initMap = () => this.initMap();
    } else {
      this.initMap();
    }
  }

  initMap(): void {
    const ubicacion = { lat: 37.19257276017656, lng: -3.616438476203938 }; 

    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: ubicacion,
        zoom: 15,
      }
    );

    new google.maps.Marker({
      position: ubicacion,
      map: map,
      title: 'Valhalla Fitness Temple'
    });
  }
}
