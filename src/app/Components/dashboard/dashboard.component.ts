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

  stateOptions: any[] = [
      { label: 'Semana', value: 'semana' },
      { label: 'Mes', value: 'mes' }
  ];

  ngOnInit() {
      this.formGroup = new FormGroup({
          value: new FormControl('semana')
      });
  }

}
