import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar distintos gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `
})

//el input (#txtTagInput) solo se conoce en el lado del template (referencia local)

export class SearchBoxComponent {

  @ViewChild('txtTagInput') //Tomar una referencia local
  public tagInput!: ElementRef<HTMLInputElement>;
  // tagInput siempre va a tener un valor

  constructor( private gifsService: GifsService ) { }


  // searchTag( newTag: string ) {
    searchTag() {
      const newTag = this.tagInput.nativeElement.value;

      this.gifsService.searchTag(newTag);

      this.tagInput.nativeElement.value = ''; //String vacío para limpiar caja de texto

    }

  }

