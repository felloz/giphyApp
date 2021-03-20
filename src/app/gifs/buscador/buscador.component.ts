import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;


  constructor(private historialService: GifsService){}

  public buscar(): void {

    var valor = this.txtBuscar.nativeElement.value;

    this.historialService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';

  }

}
