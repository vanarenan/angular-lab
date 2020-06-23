import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SubjectsService } from '../subjects.service';
import { Subject } from '../subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Subject[] = [];
    
  constructor(public service: SubjectsService, private router: Router) { }

  ngOnInit(): void {
    this.loadList();
  }
  
  loadList(): void {
    this.service.getAll().subscribe((data: Subject[]) => {
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
