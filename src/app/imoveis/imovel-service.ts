import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imovel } from './imovel.model';
import { PaginatedResponse } from '../paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private apiUrl = 'http://localhost:8080/imovel';

  constructor(private http: HttpClient) {}

  getImoveis(page: number = 0, size: number = 10, sort: string = 'bloco', direction: string = 'ASC') {
    const params = {
      page: page.toString(),
      linesPerPage: size.toString(),
      direction,
      orderBy: sort
    };

    return this.http.get<PaginatedResponse<Imovel>>(this.apiUrl, { params });
  }

  getImovel(id: string): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.apiUrl}/${id}`);
  }

  adicionarImovel(Imovel: Imovel): Observable<Imovel> {
    //console.log('Salvar Imovel:', Imovel);
    return this.http.post<Imovel>(this.apiUrl, Imovel);
  }

  atualizarImovel(Imovel: Imovel): Observable<Imovel> {
    //console.log('Atualizar Imovel:', Imovel);
    return this.http.put<Imovel>(`${this.apiUrl}/${Imovel.id}`, Imovel);
  }

  excluirImovel(id: number): Observable<void> {
    //console.log('Excluindo Imovel:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
