import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

export class Book {
  _id!: String;
  name!: String;
  price!: String;
  description!: String;  
}

@Injectable({
  providedIn: 'root'
})
export class CurdService {
 
  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient ) {}
  
  // Add
  Addbook(data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }




  //get all books
  GetBooks(){ 
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single book
  GetBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}

      }),
        catchError(this.handleError)
    )
  }

  // Update
  UpdateBook(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  DeleteBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  //error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
