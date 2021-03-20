import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGiphyResponse, Gifs } from '../interfaces/giphy.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'NEbgG7VgmleYmxBw4xrqfWJ0olPsYJOe';

  private _url: string = 'https://api.giphy.com/v1/gifs/search?';

  private _urlImage: string = '';

  private _historial: string[] = [];

  private _searchValue: string = '';

  public _results: Gifs[] = [];

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      this._results = JSON.parse(localStorage.getItem('resultados')!);
    }
  }


  public buscarGifs(gifName: string) {

    this.setSearchValue(gifName);

    this.addToHistService(this._searchValue);

    const params = new HttpParams().set('api_key', this._apiKey)
      .set('q', gifName)
      .set('limit', '10');

    this.http.get<SearchGiphyResponse>(`${ this._url }${ params }`)
      .subscribe((resp) => {

        //this._urlImage = resp.data[0].images.original.url;
        this._results = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this._results));

      })
      //data.data[0].images.original.url

  }


  private addToHistService(value: string): void {

    if (!this.filter(value)) {

      this._historial.unshift(value);
      this._historial = this._historial.slice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      localStorage.setItem('resultados', JSON.stringify(this._results));
    }

  }

  get historial(): string[] {

    return [...this._historial];

  }

  private filter(value: string): boolean {

    if (value == '') {

      return true;

    } else if(this._historial.includes(value)) {


      this._historial = this._historial.filter((item) => {
        return item != value;
      });



      return false;
    }
    // for (let index = 0; index < this._historial.length; index++) {

    //   if (this._historial[index] == value) {
    //     return true;
    //   }

    // }

    return false;
  }

  get getUrlImage() {
    return this._urlImage;
  }

  private setSearchValue(v: string): void {

    let value = v.trim().toLocaleLowerCase();

    this._searchValue = value;

  }

  private get getSearchValue(): string {
    return this._searchValue;
  }

  get getResults(): Gifs[] {
    return this._results;
  }

}
