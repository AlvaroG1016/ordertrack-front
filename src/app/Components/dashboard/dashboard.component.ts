import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  formGroup!: FormGroup;
  asdsa;
  stateOptions: any[] = [
      { label: 'Semana', value: 'semana' },
      { label: 'Mes', value: 'mes' }
  ];

  cols = [
    { field: 'nombre', header: 'Nombre', sortable: true },
    { field: 'sku', header: 'SKU' ,  sortable: false },
    { field: 'idProductoExcel', header: 'Excel ID',  sortable: false  }
  ]

  ngOnInit() {
      this.formGroup = new FormGroup({
          time: new FormControl('semana')
      });
  }
  onRowSeleccionado(row: any) {
    console.log('Desde el padre seleccionaste:', row.data);
    this.asdsa = row.data;
    // Aquí haces lo que quieras con la fila seleccionada
  }
}
