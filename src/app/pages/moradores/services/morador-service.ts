// src\app\pages\moradores\services\morador-service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Result } from '../../../shared/models/result.model';
import { PaginatedResponse } from '../../../shared/models/paginated-response.model';
import { environment } from '../../../environments/environment';

import { Morador } from '../morador.model';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {
  private apiUrl = environment.apiUrl + '/morador';

  constructor(private http: HttpClient) {}

  getMoradores(): Observable<Morador[]> {
    return this.http.get<Morador[]>(this.apiUrl);
  }

  getMoradoresPage(page: number = 0, linesPerPage: number = 10, orderBy: string = 'nome', direction: string = 'ASC') {
    const params = {
      page: page,
      linesPerPage: linesPerPage,
      orderBy: orderBy,
      direction: direction
    };

    return this.http.get<PaginatedResponse<Morador>>(`${this.apiUrl}/paginado`, { params });
  }

  getMorador(id: number): Observable<Morador> {
    return this.http.get<Result<Morador>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.dados)
    );
  }

  adicionarMorador(Morador: Morador): Observable<Morador> {
    return this.http.post<Morador>(this.apiUrl, Morador);
  }

  atualizarMorador(Morador: Morador): Observable<Morador> {
    return this.http.put<Morador>(`${this.apiUrl}/${Morador.id}`, Morador);
  }

  excluirMorador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
