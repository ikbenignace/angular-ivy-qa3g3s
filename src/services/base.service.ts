import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T,TList> {


  constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string, protected controller: string) { }



  get(action: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + this.controller + action)
      .pipe(
        catchError(this.handleError<T>())
      );
  }

  getCustomType<customT>(action: string): Observable<customT> {
    return this.http.get<customT>(this.baseUrl + this.controller + action)
      .pipe(
        catchError(this.handleError<customT>())
      );
  }


  getAll(action?: string): Observable<TList[]> {
    return this.http.get<TList[]>(this.baseUrl + this.controller + action)
      .pipe(
        catchError(this.handleError<TList[]>([]))
      );
  }
  getAllCustomtype<customT>(action?: string): Observable<customT[]> {
    return this.http.get<customT[]>(this.baseUrl + this.controller + action)
      .pipe(
        catchError(this.handleError<customT[]>([]))
      );
  }

  post(action: string, item: T) {
    return this.http.post(this.baseUrl + this.controller + action, item)
      .pipe(
        catchError(this.handleError<T>())
      );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
