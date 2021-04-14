import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Subject } from './subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  storageAll = JSON.parse(localStorage.getItem('UMSDATA'));
  storage = this.storageAll.subjects;
  
  constructor(private httpClient: HttpClient) { }
  
  create(item: Subject): Observable<void> {
    return new Observable(subscriber => {
      item.id = this.storage.sort((a,b) => a.id - b.id)[this.storage.length-1].id + 1;
      this.storage.push(item);
      localStorage.setItem('UMSDATA', JSON.stringify(this.storageAll));
      subscriber.next();
    });
  }
  
  getById(id: number): Observable<Subject> {
    return new Observable(subscriber => { subscriber.next(this.storage.find(x => x.id == id)); });
  }

  getAll(): Observable<Subject[]> {
    return new Observable(subscriber => { subscriber.next(this.storage); });
  }

  update(id: number, item: Subject): Observable<void> {
    return new Observable(subscriber => {
        var subject = this.storage.find(x => x.id == id);
        subject.name = item.name;
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