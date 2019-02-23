import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filme } from 'src/assets/filme';
import {tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  API = 'http://www.omdbapi.com/?apikey=4f29ecb9&t=';

  constructor(private http: HttpClient) { }

  getNewCard(titulo: string){
    return this.http.get<Filme>(`${this.API}${titulo}`)
    .pipe(
      tap(console.log)
    );
  }
}
