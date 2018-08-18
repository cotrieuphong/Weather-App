import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import {fakeNews} from '../data/fake-news';

@Component({
  selector: 'app-news-data',
  templateUrl: './news-data.component.html',
  styleUrls: ['./news-data.component.scss']
})
export class NewsDataComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  newsData: any

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.newsData = fakeNews[id - 1]
  }

}
