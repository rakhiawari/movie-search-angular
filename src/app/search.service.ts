import { Observable, Subject } from 'rxjs';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, debounceTime,switchMap,distinctUntilChanged,mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string = 'http://www.omdbapi.com/?s=';
  queryUrl: string = '&apikey=';

  APIKEY = "cc4d0ae7";


  constructor(private http: HttpClient) { }

  search(terms: Subject<string>) {
    return terms.pipe(debounceTime(400)
      ,distinctUntilChanged()
      ,switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
    return this.http.get('http://www.omdbapi.com/?s=' + term + '&apikey=' + this.APIKEY);
  }
}