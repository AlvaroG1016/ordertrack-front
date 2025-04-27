export interface PaginacionRequest {
    pageNumber: number;
    pageSize: number;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    searchTerm?: string;
  }
  
  export interface PaginacionResponse<T> {
    data: {
      data: T[];
      totalRows: number;
    };
  }
  