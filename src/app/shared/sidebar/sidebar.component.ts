import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  constructor(private histService: GifsService) { }

  get historial(): any {
    return this.histService.historial;
  }

  get historialLS(): any {

    const historial = localStorage.getItem('historial')
    return JSON.parse(historial || '');
  }

  public buscar(value: string): void {

    this.histService.buscarGifs(value);

  }

}
