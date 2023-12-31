import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lesson-detail-page',
  templateUrl: './lesson-detail-page.component.html',
  styleUrls: ['./lesson-detail-page.component.css']
})

  onClickGoNextPage(){
    const nextId = (this.id)? this.id + 1 : 1;
    this.router.navigate(['/lesson', nextId]);
  }
}
