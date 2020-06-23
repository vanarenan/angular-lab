import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { PointsComponent } from './points/points.component';

const routes: Routes = [
  { path: 'students', redirectTo: 'students/home', pathMatch: 'full'},
  { path: 'students/home', component: HomeComponent },
  { path: 'students/create', component: CreateComponent },
  { path: 'students/update/:itemId', component: UpdateComponent },
  { path: 'students/points/:itemId', component: PointsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
