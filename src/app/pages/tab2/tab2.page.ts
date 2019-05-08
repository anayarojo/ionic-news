import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.segment.value = this.categories[0];
    this.loadNews(this.categories[0]);
  }

  segmentChange(event) {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  loadMoreNews(event) {
    this.loadNews(this.segment.value, event);
  }

  private loadNews(category: string, event?) {
    this.newsService.getTopHeadLinesByCategory(category).subscribe((response) => {


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
