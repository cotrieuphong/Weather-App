import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { TeamComponent } from './team/team.component';
import { HourlyComponent } from './hourly/hourly.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'hourly/:city/:date',
    component: HourlyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
