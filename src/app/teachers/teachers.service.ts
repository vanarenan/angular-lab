import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Teacher } from './teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private apiServer = 'http://localhost:3000/teachers/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }
  
  create(item): Observable<Teacher[]> {
    return this.httpClient.post<Teacher>(this.apiServer, JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  getById(id): Observable<Teacher[]> {
    return this.httpClient.get<Teacher>(this.apiServer + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.apiServer)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, item): Observable<Teacher[]> {
    return this.httpClient.put<Teacher>(this.apiServer + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id) {
    return this.httpClient.delete<Teacher>(this.apiServer + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
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
