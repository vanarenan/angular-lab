import { Component, OnInit } from '@angular/core';

import { TeachersService } from '../teachers.service';
import { Teacher } from '../teacher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Teacher[] = [];
    
  constructor(public service: TeachersService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((data: Teacher[])=>{
      console.log(data);
      this.items = data;
    });
  }

}
