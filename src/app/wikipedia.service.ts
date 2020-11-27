import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ===========================================================================================================================
// Servisi:
// 1. fetch-ovanje, skladistenje, update podataka
// 2. Lokacija sa koje se salju mrezni zahtevi
// 3. Tok podataka je izmedju servisa i komponente
// 4. Implementiraju se kao klase
// 5. Angular automatski kreira po jednu instancu servisa za mene
// ===========================================================================================================================

// ===========================================================================================================================
/*
  @Injectable:
  Direktiva koja se moze koristiti nad klasama i funkcijama.
  Ona govori Angular-u da uzme klasu i da je loaduje u Injector/Container(fakticki vrsta objekta).
  Unutar container-a se desava da svako ko zatrazi WikipediaService, ce fakticki dobiti instancu novog WikipediaService-a.
  Moguce je kreirati samo jednu instancu, sto bi znacilo da ako bih napisao ->  constructor(private wikipedia: WikipediaService, private wikipedia2: WikipediaService) {}, dobio bih samo jednu instancu, ne dve.
*/
// ===========================================================================================================================

// ===========================================================================================================================
/*
  Kako bih mogao da saljem HTTP zahteve ka spoljnom svetu u app.module.ts nodul moram importovati:
    1. import { HttpClientModule } from '@angular/common/http';
    2. HttpClientModule ubacujem unutar imports niza
    3. U servis importujem -> import { HttpClient } from '@angular/common/http';
      - HttpClient je klasa, koju da bih koristio moram instancirati, sto naravno mogu uraditi preko konstruktora. HttpClient ce biti 'zavisnost' wikipedia.service.ts servisa.
*/
// ===========================================================================================================================

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  constructor(private http: HttpClient) {}

  // https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=space

  search(term: string) {
    // Parametri koji prosledjujem:
      // 1. Base URL -> string
      // 2. params(keyword) -> query parameters u vidu objekta(key-value pairs)

    return this.http.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      },
    });
  }
}
