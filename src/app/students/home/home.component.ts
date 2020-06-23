import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsService } from '../students.service';
import { Student } from '../student';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Student[] = [];
    
  constructor(public service: StudentsService, private router: Router) { }

  ngOnInit(): void {
    this.loadList();
  }
  
  loadList(): void {
    this.service.getAll().subscribe((data: Student[]) => {
      this.items = data;
    });
  }
  
  deleteItem(id): void {
    if (confirm('Ви впевнені?')) {
      this.service.delete(id).subscribe(res => {
          this.loadList();
      });
    }
  }

}
