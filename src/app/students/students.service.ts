import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  storageAll = JSON.parse(localStorage.getItem('UMSDATA'));
  storage = this.storageAll.students;

  constructor(private httpClient: HttpClient) { }
  
  create(item: Student): Observable<void> {
    return new Observable(subscriber => {
      item.points = [];
      item.id = this.storage.sort((a,b) => a.id - b.id)[this.storage.length-1].id + 1;
      this.storage.push(item);
      localStorage.setItem('UMSDATA', JSON.stringify(this.storageAll));
      subscriber.next();
    });
  }
  
  getById(id: number): Observable<Student> {
    return new Observable(subscriber => { subscriber.next(this.storage.find(x => x.id == id)); });
  }

  getAll(): Observable<Student[]> {
    return new Observable(subscriber => { subscriber.next(this.storage); });
  }

  update(id: number, item: Student): Observable<void> {
    return new Observable(subscriber => {
        var student = this.storage.find(x => x.id == id);
        student.name = item.name;
        student.group = item.group;
        localStorage.setItem('UMSDATA', JSON.stringify(this.storageAll));
        subscriber.next();
    });
  }
  
  updatePoints(id: number, item: any): Observable<void> {
    return new Observable(subscriber => {
        var student = this.storage.find(x => x.id == id);
        student.points.push(item);
        localStorage.setItem('UMSDATA', JSON.stringify(this.storageAll));
        subscriber.next();
    });
  }

  delete(id: number): Observable<void> {
    return new Observable(subscriber => {
        this.storage = this.storage.filter(x => x.id !== id);
        localStorage.setItem('UMSDATA', JSON.stringify(this.storageAll));
        subscriber.next();
    });
  }

}