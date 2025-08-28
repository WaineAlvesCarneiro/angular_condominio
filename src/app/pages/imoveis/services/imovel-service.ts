// src\app\pages\imoveis\services\imovel-service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Result } from '../../../shared/models/result.model';
import { PaginatedResponse } from '../../../shared/models/paginated-response.model';
import { environment } from '../../../environments/environment';

import { Imovel } from '../imovel.model';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private apiUrl = environment.apiUrl + '/imovel';

  constructor(private http: HttpClient) {}

  getImoveis(): Observable<Result<Imovel[]>> {
    return this.http.get<Result<Imovel[]>>(this.apiUrl);
  }

  getImoveisPage(page: number = 0, linesPerPage: number = 10, orderBy: string = 'id', direction: string = 'ASC') {
    const params = {
      page: page,
      linesPerPage: linesPerPage,
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
