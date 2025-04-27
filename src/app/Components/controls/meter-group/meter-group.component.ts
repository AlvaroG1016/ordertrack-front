import { Component, inject, OnInit } from '@angular/core';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-meter-group',
  standalone: false,
  templateUrl: './meter-group.component.html',
  styleUrl: './meter-group.component.css'
})
export class MeterGroupComponent implements OnInit{


  private productosService = inject(BaseService); // Inyectar el servicio


  ngOnInit(): void {
    this.obtenerUtilidadTotal();
  }




  value = [
    { label: 'Apps', color: '#34d399', value: 16,  },
    { label: 'Messages', color: '#fbbf24', value: 8 },
    { label: 'Media', color: '#60a5fa', value: 24 },
    { label: 'System', color: '#c084fc', value: 10 },
    { label: 'System', color: '#c084fc', value: 10 },
    { label: 'System', color: '#c084fc', value: 10 },
    { label: 'System', color: '#c084fc', value: 10 },
    { label: 'System', color: '#c084fc', value: 10 },
    { label: 'System', color: '#c084fc', value: 10 },
    { label: 'System', color: '#c084fc', value: 10 },
];


obtenerUtilidadTotal() {
  this.productosService.obtenerProductosUtilidadOverView()
    .subscribe((response: any) => {
      console.log(response);
      
      if (response && response.data && response.data.length > 0) {
        const utilidadTotal = response.data.utilidadTotal;
        this.value[0].value = utilidadTotal;
      }
    });
}
}
