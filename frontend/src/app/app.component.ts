import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_valhalla';

  private readonly library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(faFacebook, faInstagram, faLinkedin, faTwitter);   // ⬅️ sólo los que necesitas
  }
}
