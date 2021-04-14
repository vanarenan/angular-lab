import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Teacher } from './teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  storageAll = JSON.parse(localStorage.getItem('UMSDATA'));
  storage = this.storageAll.teachers;
  
  constructor(private httpClient: HttpClient) { }
  
  create(item: Teacher): Observable<void> {
    return new Observable(subscriber => {
      item.id = this.storage.sort((a,b) => a.id - b.id)[this.storage.length-1].id + 1;
      this.storage.push(item);
      localStorage.setItem('UMSDATA', JSON.stringify(this.storageAll));
      subscriber.next();
    });
  }
  
  getById(id: number): Observable<Teacher> {
    return new Observable(subscriber => { subscriber.next(this.storage.find(x => x.id == id)); });
  }

  getAll(): Observable<Teacher[]> {
    return new Observable(subscriber => { subscriber.next(this.storage); });
  }

  update(id: number, item: Teacher): Observable<void> {
    return new Observable(subscriber => {
        var teacher = this.storage.find(x => x.id == id);
        teacher.name = item.name;
        teacher.subjects = item.subjects;
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