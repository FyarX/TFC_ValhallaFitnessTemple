import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservasService, Reserva } from '../../../core/services/reservas/reservas.service';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor} from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service'
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-clases',
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './mis-clases.component.html',
  styleUrl: './mis-clases.component.css'
})
export class MisReservasComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservasService, private auth: AuthService, private toastr: ToastrService) {}

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

 cancelarReserva(reserva: Reserva) {
  const usuarioId = this.auth.getUserId();
  const claseId = reserva.clase.id;

  if (!usuarioId) {
    this.toastr.error('Debes iniciar sesión para cancelar una reserva.');
    return;
  }

  Swal.fire({
    title: '¿Cancelar reserva?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No, mantener',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    customClass: {
      confirmButton: 'swal2-confirm-custom',
      cancelButton: 'swal2-cancel-custom'
    }
  }).then(result => {
    if (result.isConfirmed) {
      this.reservaService.cancelarReserva(usuarioId, claseId).subscribe({
        next: () => {
          this.reservas = this.reservas.filter(r => r.id !== reserva.id);
          this.toastr.success('Reserva cancelada correctamente');
        },
        error: () => {
          this.toastr.error('Error al cancelar la reserva. Inténtalo de nuevo más tarde.');
        }
        });
      }
  });
}
}

