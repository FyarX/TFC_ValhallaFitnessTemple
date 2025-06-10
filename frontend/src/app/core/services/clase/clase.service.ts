import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clase {
  id: number;
  nombre: string;
  sala: string;
  fecha: string;
}

@Injectable({ providedIn: 'root' })
export class ClaseService {
  private apiUrl = 'https://backend-valhallaft.onrender.com/api/clases';

  constructor(private http: HttpClient) {}

  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl);
  }

  crearClase(formData: FormData): Observable<Object> {
    return this.http.post('https://backend-valhallaft.onrender.com/api/clases', formData, {
    responseType: 'text' as 'json'
   });
  }
}