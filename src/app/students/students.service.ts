import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiServer = 'http://localhost:3000/students/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }
  
  create(item): Observable<Student[]> {
    return this.httpClient.post<Student[]>(this.apiServer, JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  getById(id): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.apiServer + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.apiServer)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, item): Observable<Student[]> {
    return this.httpClient.put<Student[]>(this.apiServer + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Student>(this.apiServer + id, this.httpOptions)
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
