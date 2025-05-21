import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservasService, Reserva } from '../../../core/services/reservas/reservas.service';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor} from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-clases',
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './mis-clases.component.html',
  styleUrl: './mis-clases.component.css'
})
export class MisReservasComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservasService, private auth: AuthService) {}

  ngOnInit(): void {
    const usuarioId = this.auth.getUserId();
    if (!usuarioId) return;

    this.reservaService.getReservasPorUsuario(usuarioId).subscribe({
    next: res => {
      const ahora = new Date();

      // Solo reservas cuya clase aún no ha pasado
      this.reservas = res.filter(r => new Date(r.clase.fecha) > ahora);
    },
    error: err => console.error('Error al cargar reservas', err)
  });
  }
}
