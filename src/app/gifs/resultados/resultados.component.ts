import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gifs } from '../interfaces/giphy.interfaces';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {


  constructor(private gifsService: GifsService) {
    //this.gifsService.buscarGifs('perro');
  }

  ngOnInit(): void {

  }

  public imageUrl(): Gifs[] {
    console.log('URL Imagen: ' + this.gifsService.getResults);
    return this.gifsService.getResults;
  }

  get resultados(): Gifs[] {
    return this.gifsService._results;
  }



}
