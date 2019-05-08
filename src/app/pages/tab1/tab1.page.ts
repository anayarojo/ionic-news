import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.loadNews();
  }

  loadMoreNews(event) {
    this.loadNews(event);
  }

  private loadNews(event?) {
    this.newsService.getTopHeadLines().subscribe((response) => {

      this.news.push(...response.articles);

      if (event) {
        event.target.complete();
        if (response.articles.length ===  0) {
          event.target.disabled = true;
        }
      }
    });
  }

}
