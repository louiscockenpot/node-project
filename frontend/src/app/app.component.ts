import { Router } from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'TD3';

  constructor(private router: Router) {
    console.log('AppComponent.constructor()')
  }

  ngOnInit(): void {
    console.log('AppComponent.ngOnInit()')
  }

  ngOnDestroy(): void {
    console.log('AppComponent.ngOnDestroy()')
  }

}

