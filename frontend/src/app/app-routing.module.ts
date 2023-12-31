import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonEditFormComponent } from "./lesson-edit-form/lesson-edit-form.component";
import {LessonListPageComponent} from "./lesson-list-page/lesson-list-page.component";
import {LessonDetailPageComponent} from "./lesson-detail-page/lesson-detail-page.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path:'lesson-edit-form', component: LessonEditFormComponent },
  { path:'lesson-list', component: LessonListPageComponent },
  { path:'lesson/:id', component: LessonDetailPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
