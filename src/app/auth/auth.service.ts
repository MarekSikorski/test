import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyaEtFECAE9jMIxQdkGVEFXzeX0PbhQiY', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(data => {
        this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn)
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyaEtFECAE9jMIxQdkGVEFXzeX0PbhQiY', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(data => {
        this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn)
      })
    );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMes = 'An unknown error occurred!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMes));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMes = 'This email exists already.'
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMes = 'Invalid login credentials.'
        break;
    }
    return throwError(() => new Error(errorMes));
  }
}
