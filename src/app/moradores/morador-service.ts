import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Morador } from './morador.model';
import { PaginatedResponse } from '../paginated-response.model';
import { Result } from '../shared/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {
  //url JAVA e Asp Net Core
  private apiUrl = 'https://localhost:44369/morador';

  constructor(private http: HttpClient) {}

  getMoradores(): Observable<Morador[]> {
    return this.http.get<Morador[]>(this.apiUrl);
  }

  getMoradoresPage(page: number = 0, pageSize: number = 10, orderBy: string = 'nome', direction: string = 'ASC') {
    const params = {
      page: page,
      pageSize: pageSize,
      orderBy: orderBy,
      direction: direction
    };

    return this.http.get<PaginatedResponse<Morador>>(`${this.apiUrl}/paginado`, { params });
  }

  getMorador(id: number): Observable<Result<Morador>> {
    return this.http.get<Result<Morador>>(`${this.apiUrl}/${id}`);
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
