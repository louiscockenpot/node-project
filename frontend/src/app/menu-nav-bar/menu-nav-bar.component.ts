import {Component, OnInit} from '@angular/core';
import { AppComponent } from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.css']
})
export class MenuNavBarComponent {
  constructor(private router: Router) { }
  isOnHomePage(): boolean {
    return this.router.url === '/';
  }
}
