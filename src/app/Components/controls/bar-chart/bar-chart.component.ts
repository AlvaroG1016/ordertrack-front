import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { BaseService } from '../../../services/base.service'; // Importa el servicio
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  standalone:false,
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() time = 'semana';
  basicData: any;
  basicOptions: any;

  platformId = inject(PLATFORM_ID);
  private productosService = inject(BaseService); // Inyectar el servicio

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.obtenerDatosAgrupados();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['time']) {
      // Si el valor de 'time' cambia, volvemos a obtener los datos
      this.obtenerDatosAgrupados();
    }
  }
  obtenerDatosAgrupados() {
    const filtro = {
      FechaInicio: new Date('2025-01-01'),  // Define las fechas de inicio y fin
      FechaFin: new Date('2025-12-31'),
      TipoAgrupacion: this.time  // Cambia esto según lo que desees
    };
  
    this.productosService.obtenerProductosAgrupados(filtro)
      .pipe(
        map((agrupados: any) => {
          console.log('Datos brutos:', agrupados);
        
          const agrupaciones = agrupados?.data; // Array de objetos agrupados por mes
        
          if (!Array.isArray(agrupaciones)) {
            console.error('Los datos no son válidos');
            return { labels: [], datasets: [] };
          }
        
          const labels = agrupaciones.map((item: any) => item.agrupacion); // ["2025-03", "2025-02", "2025-01"]
        
          // Obtener todos los nombres de productos únicos
          const nombresProductosUnicos = Array.from(new Set(
            agrupaciones.flatMap((agrupacion: any) =>
              agrupacion.productos.map((p: any) => p.nombreProducto)
            )
          ));
        
          // Crear un dataset por producto
          const datasets = nombresProductosUnicos.map((nombreProducto) => {
            const data = agrupaciones.map((agrupacion: any) => {
              const producto = agrupacion.productos.find((p: any) => p.nombreProducto === nombreProducto);
              return producto ? producto.totalVendido : 0;
            });
        
            return {
              label: nombreProducto,
              backgroundColor: this.getColorForProduct(nombreProducto),
              data,
              borderRadius: 10, // Aquí se redondean las barras
              barPercentage: 0.5, // Ajusta el ancho de las barras si es necesario


            };
          });
        
          return { labels, datasets };
        })
        
      )
      .subscribe((chartData: any) => {
        this.basicData = {
          labels: chartData.labels, // Las fechas para el eje X
          datasets: chartData.datasets // Los datasets para los productos
        };
  
        // Establecer las opciones del gráfico
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
  
        this.basicOptions = {
          maintainAspectRatio: false,
          aspectRatio: 0.9,
          plugins: {
            title: {
              display: true,  
              text: '3 Productos mas vendidos',  
              color: '#4E505A',  
              font: {
                size: 18,  
                family: 'Arial, sans-serif',  
                
              },
              padding: {
                bottom: 30 
              },
              align: 'start',

            },
            legend: {
              display: false, // Esto oculta las leyendas
            }
          },
          scales: {
              x: {
                  stacked: true,
                  ticks: {
                      color: textColorSecondary,
                      minRotation: 0,  // Evitar la rotación de los labels
                      maxRotation: 0,  // Asegura que los labels no se roten
                      padding: 5, // Controla el espacio entre el label y la línea del eje X
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  },
                  categoryPercentage: 0.1, // Ajusta el ancho de las categorías (meses)
                  barPercentage: 0.1, // Ajusta el tamaño de las barras
                  
              },
              y: {
                  stacked: true,
                  ticks: {
                      color: textColorSecondary,
                      stepSize:50
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
        this.cd.markForCheck();
      });
  }
  
  // Función para asignar un color único a cada producto
  getColorForProduct(productName: string): string {
    const colors = [
      'rgba(191, 219, 254, 0.8)', // Azul claro
      'rgba(147, 197, 253, 0.8)', // Azul más oscuro
      'rgba(37, 99, 235, 0.8)',   // Azul más profundo
      'rgba(29, 78, 216, 0.8)',   // Azul marino
      'rgba(17, 82, 147, 0.8)',   // Azul petróleo
      'rgba(99, 179, 255, 0.8)',  // Azul celeste suave
      'rgba(77, 153, 255, 0.8)',  // Azul medio
      'rgba(44, 113, 255, 0.8)',  // Azul vibrante
      'rgba(13, 148, 255, 0.8)',  // Azul brillante
      'rgba(99, 221, 254, 0.8)',  // Azul claro con matiz verde
      'rgba(52, 144, 255, 0.8)',   // Azul turquesa
      'rgba(59, 130, 246, 0.8)', 

    ];
    
  
    // Asigna un color según el nombre del producto (puedes personalizar esta lógica)
    const hash = productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % colors.length;
    return colors[index];
  }
  
  
}
