import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account} from "../model/account.model";
import {catchError, Observable, of, throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public getAccount(clientNumber: number): Observable<Account>{
    return this.http.get<Account>(environment.api + 'accounts/' + clientNumber)
      .pipe(catchError(err => {
        return throwError(err.error.message);
      }));
  }

  public deposit(accountNumber: number, amount: number, description: string): Observable<Account>{
    let data = {accountNumber: accountNumber, amount: amount, description: description};
    return this.http.put<Account>(environment.api + 'accounts/deposit', data)
      .pipe(catchError(err => {
        return throwError(err.error.message);
      }));
  }

  public withdrawal(accountNumber: number, amount: number, description: string): Observable<Account>{
    let data = {accountNumber: accountNumber, amount: amount, description: description};
    return this.http.put<Account>(environment.api + 'accounts/withdrawal', data)
      .pipe(catchError(err => {
        return throwError(err.error.message);
      }));
  }
}
