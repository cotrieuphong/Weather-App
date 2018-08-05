import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { TeamComponent } from './team/team.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
