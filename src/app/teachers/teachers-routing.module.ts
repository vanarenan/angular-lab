import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'teachers', redirectTo: 'teachers/home', pathMatch: 'full'},
  { path: 'teachers/home', component: HomeComponent },
  { path: 'teachers/create', component: CreateComponent },
  { path: 'teachers/update/:itemId', component: UpdateComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
