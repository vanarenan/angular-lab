import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'subjects', redirectTo: 'subjects/home', pathMatch: 'full'},
  { path: 'subjects/home', component: HomeComponent },
  { path: 'subjects/create', component: CreateComponent },
  { path: 'subjects/update/:itemId', component: UpdateComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
