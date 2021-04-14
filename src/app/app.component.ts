import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import database from '../../server/database.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    if (!localStorage.getItem('UMSDATA')) this.restoreData();
  }
  
  onRestore(): void {
    if (confirm('Ви впевнені?')) {
      this.restoreData();
      window.location.reload();
      alert('Базу було відновлено.');
    }
  }
  
  restoreData(): void {
    localStorage.setItem('UMSDATA', JSON.stringify(database));
  }
}