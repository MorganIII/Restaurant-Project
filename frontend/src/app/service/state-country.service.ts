import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../model/country';
import { Observable, map } from 'rxjs';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class StateCountryService {

  baseUrl = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }


  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}countries`).pipe(
      map(response => response)
    );
  }

  getAllStates(): Observable<State[]>{
    return this.http.get<State[]>(`${this.baseUrl}states`).pipe(
      map(response => response)
    );
  }

  getStatesByCountryCode(code: string): Observable<State[]>{
    return this.http.get<State[]>(`${this.baseUrl}statecode?code=${code}`).pipe(
      map(response => response)
    );
  }

}
