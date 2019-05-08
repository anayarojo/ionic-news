import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  news: Article[] = [];

  constructor(private storage: Storage) { 
    this.loadNews();
  }

  saveNew(news: Article) {
    const exists = this.news.find(obj => obj.title === news.title);

    if (!exists) {
      this.news.unshift(news);
      this.storage.set('favorites', this.news);
    }
  }

  async loadNews() {
    const favorites = await this.storage.get('favorites');
    this.news = favorites ? favorites : [];
  }

  removeNews(news: Article) {
    this.news = this.news.filter(item => item.title !== news.title);
    this.storage.set('favorites', this.news);
  }
}
