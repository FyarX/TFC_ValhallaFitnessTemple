import { Component } from '@angular/core';
import { LucideAngularModule, Menu, LUCIDE_ICONS, LucideIconProvider} from "lucide-angular";

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Menu })
    }
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
}
