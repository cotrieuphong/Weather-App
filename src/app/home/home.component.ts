import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function(){
      $('.day').click(function(){
        $(this).siblings().removeClass('active');
        $(this).siblings().find('.day-stats').removeClass('active');
        $(this).find('.day-stats').toggleClass('active');
        $(this).toggleClass('active');

      })

      $(window).scroll(function(){
        if($(window).scrollTop() > window.outerHeight - $('.city-forecast').offset().top + 200){
          $('.city-forecast').addClass('active')
        }
      })

    })
  }

}
