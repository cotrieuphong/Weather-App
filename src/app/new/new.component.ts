import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {fakeNews} from '../data/fake-news';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

    constructor() { }

    newsData: any

    ngOnInit() {
        this.newsData = fakeNews
    }

}
