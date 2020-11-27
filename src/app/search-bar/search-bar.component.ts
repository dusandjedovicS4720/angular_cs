import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() submitted = new EventEmitter<string>();
  term = '';

  constructor() {}

  ngOnInit(): void {}

  // onInput(value: string) {
  //   this.term = value;
  // }

  onFormSubmit(event: any) {
    // Svaki put kada pritisnem taster enter browser ce automatski refreshovati stranicu i submitovati formu.
    // Ovo ponasanje mogu spreciti sa sledecom linijom.
    event.preventDefault();
    this.submitted.emit(this.term);
  }

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

}
