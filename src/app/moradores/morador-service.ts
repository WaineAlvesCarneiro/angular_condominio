import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Morador } from './morador.model';
import { PaginatedResponse } from '../paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {
  private apiUrl = 'http://localhost:8080/morador';

  constructor(private http: HttpClient) {}

  getMoradores(page: number = 0, size: number = 10, sort: string = 'nome', direction: string = 'ASC') {
    const params = {
      page: page.toString(),
      linesPerPage: size.toString(),
      direction,
      orderBy: sort
    };

    return this.http.get<PaginatedResponse<Morador>>(this.apiUrl, { params });
  }

  getMorador(id: string): Observable<Morador> {
    return this.http.get<Morador>(`${this.apiUrl}/${id}`);
  }

  adicionarMorador(Morador: Morador): Observable<Morador> {
    //console.log('Salvar Morador:', Morador);
    return this.http.post<Morador>(this.apiUrl, Morador);
  }

  atualizarMorador(Morador: Morador): Observable<Morador> {
    //console.log('Atualizar Morador:', Morador);
    return this.http.put<Morador>(`${this.apiUrl}/${Morador.id}`, Morador);
  }

  excluirMorador(id: number): Observable<void> {
    //console.log('Excluindo Morador:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
