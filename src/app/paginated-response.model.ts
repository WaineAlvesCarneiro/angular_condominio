export interface PaginatedResponse<T> {
  sucesso: boolean;
  dados: {
    items: T[];
    totalCount: number;
    pageIndex: number;
    linesPerPage: number;
  };
  erro?: string;
}
