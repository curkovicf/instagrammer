import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EnvironmentService } from '@instagrammer/web/shared/app-configs';
import { LoginRequestDto, LoginResponseDto } from '@instagrammer/shared/data-access/api-dtos';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly url;
  public token: string | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService,
    private readonly router: Router,
  ) {
    this.url = `${this.environmentService.baseUrl}/auth/login`;
  }

  public login(credentials: LoginRequestDto): Observable<boolean> {
    return this.http.post<LoginResponseDto>(this.url, credentials).pipe(
      map((loginResponseDto?) => {
        if (!loginResponseDto) {
          return false;
        }

        this.token = loginResponseDto.accessToken;

        this.router.navigate(['/dummy-home']);
        console.log('TOKEN ', this.token);

        return true;
      }),
    );
  }
}
