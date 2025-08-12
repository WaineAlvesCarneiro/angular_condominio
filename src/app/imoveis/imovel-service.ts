import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Imovel } from './imovel.model';
import { PaginatedResponse } from '../paginated-response.model';
import { Result } from '../shared/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  //url JAVA e Asp Net Core
  private apiUrl = 'https://localhost:44369/imovel';

  constructor(private http: HttpClient) {}

  getImoveis(): Observable<Result<Imovel[]>> {
    return this.http.get<Result<Imovel[]>>(this.apiUrl);
  }

  getImoveisPage(page: number = 0, pageSize: number = 10, orderBy: string = 'bloco', direction: string = 'ASC') {
    const params = {
      page: page,
      pageSize: pageSize,
      orderBy: orderBy,
      direction: direction
    };

    return this.http.get<PaginatedResponse<Imovel>>(`${this.apiUrl}/paginado`, { params });
  }

  getImovel(id: number): Observable<Imovel> {
    return this.http.get<Result<Imovel>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.dados)
    );
  }

  adicionarImovel(Imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(this.apiUrl, Imovel);
  }

  atualizarImovel(Imovel: Imovel): Observable<Imovel> {
    return this.http.put<Imovel>(`${this.apiUrl}/${Imovel.id}`, Imovel);
  }

  excluirImovel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
