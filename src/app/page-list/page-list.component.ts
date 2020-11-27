import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {

  // Interpolacija ===========================================================================================================================
  // Interpolacija(spada u oblast Templejt sintakse)
  // {{pages.length}} -> Referenciram property pages, i ispisujem duzinu niza.
  // ===========================================================================================================================

  // Property Binding ===========================================================================================================================
  /*
    Svaki property html elemenata iz template-a, mogu bind-ovati na property is typescript file-a tako sto cu taj element property ubaciti u [] zagrade:
      <a target="_blank" [href]="'https://en.wikipedia.org?curid='+page.pageid">
  */
  // ===========================================================================================================================

  // Escape Characters, XSS ===========================================================================================================================
  /*
    Kao programer zelim da prikazem samo onaj HTML koji sam ja kreirao, a ne HTMl koji dolazi iz nekog eksternog izvora(npr. od Wikipedia API-a), jer to izlaze aplikaciju bezbednosnom riziku.
    Angular po defaultu uzima eksterni html koji je pristigao, sprovodi ga kroz "escaper(srp. eskejper)" i samim tim ga ispisuje zajedno sa svim znakovima(<>, </>, itd..) unutar browsera
    Ovo nije defaultno ponasanje, browser bi ispisao takav HTML, osim ukoliko se eksplicitno ne navade da to ne zelim.
    Ovo je zastita za takozvane XSS(Cross-Site-Scripting) napade, gde zlonamerni korinici mogu izvrsiti JS kod na browseru drugog korisnika. Taj JS kod se moze koristiti za kradju kredencijala, slanje zahteva, itd..
    Angular u potpunosti stiti od ovakvih napada.

    Ukoliko zelim da prikazem HTML na BEZBEDAN nacin:
    <td [innerHTML]="page.snippet"></td>
    Na liniji iznad, angular uzima html i "cisti" ga od JS-a ili ostalog sadrzaja koji potencijalno moze biti opasan..
    Primer html-a koji moze na neki nacin da izvrsi JS: xss = '<img src="" onerror="alert(123)" />' -> Ovde ce se svaki put pozvati alert() funkcija kada browser ustanovi da je src property prazan.
    Angular zna da onerror="alert(123)" moze potencijalno biti opasno, pa ce s obzirom na to unutar DOM-a renderovati img element bez onerror="alert(123)".
  */
  // ===========================================================================================================================

  // U Globalni stil dodajem -> '.searchmatch {font-weight:bold;}' posto zelim da iskoristim klasu .searchmatch koja vec dolazi sa wikipedie i obelezava rec u recenici koja sadrzi trazeni termin.

  @Input() pages = [];

  constructor() { }

  ngOnInit(): void {
  }

}
