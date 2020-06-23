import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Subject } from './subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private apiServer = 'http://localhost:3000/subjects/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }
  
  create(item): Observable<Subject[]> {
    return this.httpClient.post<Subject[]>(this.apiServer, JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  getById(id): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.apiServer + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(this.apiServer)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, item): Observable<Subject[]> {
    return this.httpClient.put<Subject[]>(this.apiServer + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Subject>(this.apiServer + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
