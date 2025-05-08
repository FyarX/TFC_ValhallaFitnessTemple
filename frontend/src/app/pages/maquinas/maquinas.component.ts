import { Component, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, MapPin} from 'lucide-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-maquinas',
  imports: [RouterModule, LucideAngularModule, FontAwesomeModule, NgIf],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ MapPin })
    }
  ],
  templateUrl: './maquinas.component.html',
  styleUrl: './maquinas.component.css'
})
export class MaquinasComponent {
  faMapPin = faMapPin; // Definición de la variable para el icono de FontAwesome

  videoAductorVisible = false; // Variable para controlar la visibilidad de los videos
  videoShoulderVisible = false; // Variable para controlar la visibilidad de los videos
  videoQuadsVisible = false; // Variable para controlar la visibilidad de los videos
  videoLegPressVisible = false; // Variable para controlar la visibilidad de los videos
  videoLatPulldownVisible = false; // Variable para controlar la visibilidad de los videos
  videoPredicatorVisible = false; // Variable para controlar la visibilidad de los videos
  videoLateralRaiseVisible = false; // Variable para controlar la visibilidad de los videos
  videoBenchPressVisible = false; // Variable para controlar la visibilidad de los
}
