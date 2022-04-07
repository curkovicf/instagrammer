import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string | null = null;
  public url = '';

  constructor(private readonly http: HttpClient) {}

  public login(credentials: any): Observable<boolean> {
    return this.http.post<any>(this.url, credentials).pipe(
      map((accessToken?) => {
        if (!accessToken) {
          return false;
        }

        this.token = accessToken;

        return true;
      }),
    );
  }

  public register(credentials: any): Observable<boolean> {
    return this.http.post<any>(this.url, credentials).pipe(
      map((accessToken?) => {
        if (!accessToken) {
          return false;
        }

        this.token = accessToken;

        return true;
      }),
    );
  }
}
