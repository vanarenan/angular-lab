import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeachersService } from '../teachers.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { Teacher } from '../teacher';
import { Subject } from '../../subjects/subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Teacher[] = [];
  subjectsData: Subject[] = [];
    
  constructor(
    private router: Router,
    public service: TeachersService, 
    public subjectsService: SubjectsService
  ) { }

  ngOnInit(): void {
    this.loadList();
  }
  
  loadList(): void {
    this.subjectsService.getAll().subscribe((data: Subject[]) => {
      this.subjectsData = data;
      this.service.getAll().subscribe((data: Teacher[]) => {
        this.items = data;
      });
    });
  }
  
  getSubject(id: number): string {
    let subject = this.subjectsData.find((o) => o.id == id)
    return ( subject != undefined) ? subject.name : '';
  }
  
  deleteItem(id): void {
    if (confirm('Ви впевнені?')) {
      this.service.delete(id).subscribe(res => {
          this.loadList();
      });
    }
  }

}
