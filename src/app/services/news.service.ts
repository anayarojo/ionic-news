import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadlinesResponse } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  headLinesPage = 0;
  currentCategory = '';
  categoryPage = 0;

  constructor(private http: HttpClient) { }

  getTopHeadLines() {
    this.headLinesPage ++;
    const query = `/top-headlines?country=mx&category=business&page=${this.headLinesPage}`;
    return this.get<TopHeadlinesResponse>(query);
  }

  getTopHeadLinesByCategory(category: string) {

    if (this.currentCategory === category) {
      this.categoryPage++;
    } else {
      this.categoryPage = 0;
      this.currentCategory = category;
    }

    const query = `/top-headlines?country=mx&category=${category}&page=${this.categoryPage}`;
    return this.get<TopHeadlinesResponse>(query);
  }

  private get<T>(query: string) {
    const url = apiUrl + query;
    return this.http.get<T>(url, {
      headers
    });
  }
}