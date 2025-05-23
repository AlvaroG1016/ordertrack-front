import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { PaginacionRequest, PaginacionResponse } from '../../../interfaces/datatable';

@Component({
  selector: 'app-datatable',
  standalone: false,
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent<T> {
  @Input() columns!: { field: string; header: string; sortable:boolean }[];
  @Input() endpoint!: string;
  @Input() dataKey: string = 'id';
  @Input() selectionMode: 'single' | 'multiple' = 'single';
  @Output() rowClick = new EventEmitter<T | T[]>(); 
  @Output() selectionChange = new EventEmitter<T>();

  data: T[] = [];
  totalRecords = 0;
  loading = false;
  searchTerm = '';
  selectedItem!: T;
  constructor(private readonly http: HttpClient) {}

  loadLazy(event: TableLazyLoadEvent) {
    this.loading = true;

    const sortField = Array.isArray(event.sortField)
      ? event.sortField[0]
      : event.sortField ?? '';

    const filtro: PaginacionRequest = {
      pageNumber: (event.first! / event.rows!) + 1,
      pageSize: event.rows ?? 10,
      sortColumn: sortField,
      sortDirection: event.sortOrder === 1 ? 'asc' : 'desc',
      searchTerm: this.searchTerm
    };

    this.http.post<PaginacionResponse<T>>(this.endpoint, filtro).subscribe(res => {
      console.log(res);
      
      this.data = res.data.data;
      this.totalRecords = res.data.totalRows;
      this.loading = false;
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.loadLazy({ first: 0, rows: 10 } as TableLazyLoadEvent);
  }

 onRowSelectHandler(event: any) {
  this.selectedItem = event;
  this.selectionChange.emit(this.selectedItem);
}
}
