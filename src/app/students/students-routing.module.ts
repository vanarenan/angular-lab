import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'students', redirectTo: 'students/home', pathMatch: 'full'},
  { path: 'students/home', component: HomeComponent },
  { path: 'students/details/:itemId', component: DetailsComponent },
  { path: 'students/create', component: CreateComponent },
  { path: 'students/update/:itemId', component: UpdateComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
