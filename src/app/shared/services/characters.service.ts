import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private apiUrl = 'https://theofficeapi.dev/api/characters';
  private defaultLimit = 10; 

  constructor(private http: HttpClient) {}

  getCharacters(includeEpisodes: boolean = false, limit: number = this.defaultLimit): Observable<any[]> {
    const params = new HttpParams()
      .set('includeEpisodes', includeEpisodes ? 'true' : 'false')
      .set('limit', limit.toString());

    const apiUrlWithParams = `${this.apiUrl}?${params.toString()}`;

    return this.http.get<any>(apiUrlWithParams).pipe(
      catchError((error) => {
        console.error('Error fetching characters:', error);
        return [];
      }),
      map((data) => {
        const characters = Array.isArray(data.results) ? data.results : [];
        console.log('All characters:', characters);
        return characters;
      })
    );
  }

  getCharacterDetails(id: number, includeEpisodes: boolean = true): Observable<any> {
    const params = new HttpParams().set('includeEpisodes', includeEpisodes ? 'true' : 'false');
    const url = `https://theofficeapi.dev/api/character/${id}?${params.toString()}`;
    return this.http.get<any>(url);
  }
  
}
