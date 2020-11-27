import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // Za prosledjivanje podataka(pages[]) iz Parent komponente ka Child komponenti: ===========================================================================================================================
    // 1. Definisem property koji prosledjujem -> pages = [];
    // 2. Property Binding -> Sa leve strane je property u Child komponenti -> [pages], sa desne strane je property koji prosledjujem iz Parent komponente -> "pages" = <app-page-list [pages]="pages"></app-page-list>
    // 3. U Child komponenti uvozim Input dekorator -> import { Component, OnInit, Input } from '@angular/core';
    // 4. @Input dekorator govori da ce property biti obezbedjen iz Parent komponente -> @Input() pages = [];
    // 5. Naziv property-a mora biti naravno isti kao i unutar koraka 3 -> [pages]. 

  pages = [];

  // ===========================================================================================================================
  

  // Prosledjivanje od Child komponente ka Parent komponenti ===========================================================================================================================

  // Za prosledjivanje podataka(term property) iz Child komponente ka Parent komponenti:
    // 1. Child - Uvozim EventEmitter, Output
    // 2. Child - Definisem variablu -> @Output() submitted = new EventEmitter<string>();
    // 3. Child - Emitovanje zeljenog property-a -> this.submitted.emit(this.term);
    // 4. Parent -  osluskujem "submitted" event:
          // <app-search-bar (submitted)="onTerm($event)"></app-search-bar>
          // Svaki put kada se u child komponenti dogodi (submit) event, taj event ce se emitovati iz te child komponente nazad ka parentu, koji osluskuje taj event i u tom momentu aktivira onTerm() funkciju.
    // 5. Parent - Funkciji onTerm prosledjujem podatke
          // onTerm(term: string) {
          //     console.log(term)
          // }

  // ===========================================================================================================================

  // Dependency Injection - Instanciranje ===========================================================================================================================
  /* 
    constructor(private wikipedia: WikipediaService) {}
    
    Linija iznad je skracenica za:
      
      wikipedia: WikipediaService
      
      constructor(private wikipedia: WikipediaService) {
        this.wikipedia = wikipedia;
      }

    Angular za mene, iza zavese kreira instance za svaki od parametara unutar konstruktora

  */
 // ===========================================================================================================================


// Dependency Injection - @Injectable ===========================================================================================================================
/*
  @Injectable:
  Direktiva koja se moze koristiti nad klasama i funkcijama.
  Ona govori Angular-u da uzme klasu i da je loaduje u Injector/Container(fakticki vrsta objekta).
  Unutar container-a se desava da svako ko zatrazi WikipediaService, ce fakticki dobiti instancu novog WikipediaService-a.
  Moguce je kreirati samo jednu instancu, sto bi znacilo da ako bih napisao ->  constructor(private wikipedia: WikipediaService, private wikipedia2: WikipediaService) {}, dobio bih samo jednu instancu, ne dve.
*/
// ===========================================================================================================================

// Dependency Injection - Osobine ===========================================================================================================================

  /*
      Cilj je lakse testiranje.
      U teoriji poboljsava reuse koda i omogucava lakse izmene.
      Angular sadrzi odgovarajuce alate koji automatizuju ceo proces DI-a, tako da se sve zavisnosti koje se definisu kao parametri konstruktora automatski instanciraju iza zavese.
  */

// ===========================================================================================================================

// Rxjs ===========================================================================================================================
/* 
  - Functional Reactive Programming Library
  - Zasebna biblioteka od Angular-a. Angular tim je odlucio da ona bude automatski ukljucena u Angular projekat.
  - U okviru Angular-a ova bilbioteka se specificno koristi za upravljanje podacima(U okruzenjima(bibliotekama, jezicima) van Angular-a moze se koristiti i u drugim kontekstima).
  - U Angular-u se najvise koristi za konstruisanje mreznih(network) zahteva, i drugih slicnih asinhronih zadataka.
  - U Angularu-u se koristi umesto promise objekta i async/await.
  - Generalno veoma kompleksan, jedna od najtezih tema/oblasti u svetu JavaScript-a, pogotovo Angular-a.

  Analogija(radi lakseg razumevanja citaocu ovog dokumenta):
      1. Input Element -> Izvor dogadjaja(Source of events)
      2. Processing pipeline:
        2.1 Uzmi vrednost od event objekta koji je "zakacen" nad input elementom
        2.2 Parsiraj broj od unete vrednosti
        2.3 Izvrsi inspekciju broja:
          2.3.1 Izbaci gresku ukoliko je untet string, a ne broj
        2.4 Predaj broj necemu sto ce ga "konzumirati(funkciji, itd..)"
      
    Sada mozemo povuci paralelu sa Rxjs-om:
      1. Izvor dogadjaja(Source of events) u svetu Rxjs-a bi bila "OBSERVABLE"
        1.1. Observable -> Emituje dogadjaje tokom vremena.
        1.2. Emitovane dogadjaje zelim da "osluskujem" i da ih procesujem na odredjen nacin.
        1.3. Sa vrednoscu koja izadje iz takozvanog "processing pipeline-a", zelim naravno da uradim nesto u okviru aplikacije.
      2. Processing pipeline(PIPE) sadrzi niz individualnih processing koraka koji uzmu vrednost, transformisu je i proslede narednom koraku u okviru processing pipeline-a.
      3. Ovakve korake mozemo predstaviti operatorima(OPERATORS)
        3.1. Operatori su "funkcije" koje izvrsavaju neki konkratan zadatak nad pristiglom vrednoscu.
        3.2. 75% Rxjs-a je pamcenje razlicitih operatora.
        3.3. Preporuka je da se ustanovi tacno koja vrednost dolazi od OBSERVABLE-a, a potom koji je operator najbolje primeniti nad takvim tipom podatka.
      4. Konacna vrednost(bila to neka greska ili ralna vrednost) koja izadje is PIPE-a se predaje OBSERVERU.


    PRIMER:

    const { fromEvent } = Rx;

    // Funkcionise slicno kao i .map u obicnom JavaScriptu 
    const { map } = RxOperators;

    const input = document.createElement('input');
    const container = document.querySelector('.container');
    container.appendChild(input);
    const observable = fromEvent(input, 'input')
      // pipe() je metoda dostupna za koriscenje nad svim observable varijablama i ona kreira processing pipeline
      // funkciji pipe() mogu proslediti seriju razlicitih operatora
      .pipe(
        // observable varijabla emituje event dogadjaj
        // argument event predstavljla dogadjaj koji dolazi iz observable varijable
        // iz event dogadjaja vadim event.target.value(vrednost iz inputa), i tu vrednost vracam iz ovog koraka(map operatora).
        // sledeci operator vise NE BI radio sa event objektom, vec sa vrednoscu event.target.value
        map(event => event.target.value),
        // Kod na liniji iznad je ekvivalentant:
        //
        //  map(event => {
        //      return event.target.value
        //    })
        //
        // Vracam NaN ukoliko je unter string, ili broj ukoliko je unter broj
        map(value => parseInt(value)),
        map(value => {
          // Ukoliko nije unet broj vec string processing pipeline emituje error, a OBSERVABLE prestaje sa radom.
          if(isNaN(value)) {
            throw new Error('Enter a number!')
          }
          // Ukoliko je unter broj, a ne string onda vrednost moze da izadje iz pipe-line-a.
          return value;
        })
      )
    // Kada se izvrsi poslednji operator vrednost ce izaci iz pipe-a ka OBSERVERU.
    // Ovde je observer ono sto prosledim funkciji subscribe()
    // Mogu biti prosledjene funkcija ili objekat.
    // U ovom slucaju cu proslediti objekat koji moze imati tri kljuca
    observable.subscribe({
      // next() se poziva svaki put kada emitujem vrednost iz processing pipe-line-a. value predstavlja tu vrednost
      next(value) {
        console.log(`Vasa vrednost je: ${value}`)
      },
      // Ukoliko se na bilo kom koraku unutar pipe-line-a dogodi bilo kakva greska
      error(err) {
        console.error("Doslo je do greske!", err.message)
      },
      complete() {
      }
    })

      
*/ 

// ===========================================================================================================================

  constructor(private wikipedia: WikipediaService) {}

  public onTerm(term: string) {
    // Funkcija subscribe() prihvata callback funkciju
    // Callback funkcija ce biti pozvana bez obzira na odgovor koji dobijam od vikipedia api-a
    // Taj odgovor cu dobiti u vidu response argumenta
    this.wikipedia.search(term).subscribe((response : any) => {
      // Kada pokusam da pristupim .query.search TypeScript ce prikazivati gresku, to mogu "delimicno" resiti tako sto cu na response postaviti tip any -> .subscribe((response : any) => {
      this.pages = response.query.search;
    })
  }
}
