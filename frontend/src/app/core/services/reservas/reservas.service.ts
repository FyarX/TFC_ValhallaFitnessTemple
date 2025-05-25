import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reserva {
  id: number;
  fecha: string;
  clase: {
    fecha: string | number | Date;
    id: number;
    nombre: string;
    sala: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = 'http://localhost:8080/api/reservas';
  constructor(private http: HttpClient) { }

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  getReservasPorUsuario(usuarioId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  cancelarReserva(usuarioId: number, claseId: number): Observable<any> {
  return this.http.delete(`http://localhost:8080/api/reservas`, {
    params: {
      usuarioId: usuarioId.toString(),
      claseId: claseId.toString()
    }
  });
}
}
