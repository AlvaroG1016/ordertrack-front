import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient) {}

  obtenerProductosAgrupados(filtro: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Producto/ObtenerProductosAgrupados`, filtro);
  }
}
