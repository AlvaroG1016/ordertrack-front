import {
  Component,
  inject,
  Input,
  input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-meter-group',
  standalone: false,
  templateUrl: './meter-group.component.html',
  styleUrl: './meter-group.component.css',
})
export class MeterGroupComponent {
  @Input() value: any; // Puede ser tipo any u otra interfaz concreta si la tienes
  datosParaMostrar: any[] = [];
  data
  colores = [
    '#34d399', // verde esmeralda
    '#fbbf24', // amarillo dorado
    '#60a5fa', // azul claro
    '#c084fc', // violeta claro
    '#f472b6', // rosa
    '#f87171', // rojo suave
    '#10b981', // verde
    '#3b82f6', // azul
    '#6366f1', // índigo
    '#8b5cf6', // púrpura
    '#ec4899', // fucsia
    '#ef4444', // rojo
    '#f97316', // naranja
    '#eab308', // amarillo
    '#22c55e', // verde lima
    '#06b6d4', // cian
    '#0ea5e9', // azul cielo
    '#14b8a6', // turquesa
    '#db2777', // rosa fuerte
    '#7c3aed', // púrpura oscuro
    '#991b1b', // rojo oscuro
    '#047857', // verde oscuro
    '#1e40af', // azul marino
    '#78350f', // marrón
    '#4b5563', // gris
    '#9ca3af'  // gris claro
  ];
    constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value) {
      console.log('Desde el meter group', this.value.idProducto);
      this.http.get<any>(`${environment.apiUrl}/Producto/GetEstadoProductos?idProducto=${this.value.idProducto}`).subscribe((response) => {
        this.data = response.data.map((item, index) => ({
          label: `${item.estado}: ${item.total}`, 
          value: item.porcentaje,
          color: this.colores[index % this.colores.length],
        }));
        
      });
      this.datosParaMostrar = this.convertirAFormato(this.data); 
    }
  }

  convertirAFormato(estados: any[]): any[] {
    return estados.map((item, index) => ({
      label: item.estado,
      value: item.cantidad,
      color: this.colores[index % this.colores.length],
    }));
  }

}
