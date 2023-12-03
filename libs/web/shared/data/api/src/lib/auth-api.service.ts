import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '@instagrammer/web/core/env';
import { AuthApi, UserApi } from '@instagrammer/shared/data/api';
import LoginResponseDto = UserApi.LoginResponseDto;

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public readonly url;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    this.url = `${this.environmentService.baseUrl}/auth`;
  }

  public signUp(signUpDto: AuthApi.SignUpDto): Observable<AuthApi.SignInResponseDto> {
    return this.http.post<AuthApi.SignInResponseDto>(`${this.url}/sign-up`, signUpDto);
  }

  public signIn(signInDto: AuthApi.SignInDto): Observable<AuthApi.SignInResponseDto> {
    return this.http.post<AuthApi.SignInResponseDto>(`${this.url}/sign-in`, signInDto);
  }

  public signInViaRefreshToken(): Observable<LoginResponseDto> {
    return this.http.post<AuthApi.SignInResponseDto>(`${this.url}/sign-in-via-refresh-token`, {});
  }

  public checkIfUsernameExists(
    usernameExistsDto: AuthApi.UsernameExistsDto,
  ): Observable<AuthApi.UsernameExistsDto> {
    return this.http.post<AuthApi.UsernameExistsDto>(`${this.url}/username-exists`, usernameExistsDto);
  }

  public saveLoginInfo(): Observable<AuthApi.SignInResponseDto> {
    return this.http.post<AuthApi.SignInResponseDto>(
      `${this.url}/sign-in-long-session`,
      {},
      { withCredentials: true },
    );
  }

  public signOut(): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, {});
  }

  public authenticateTokens(): Observable<AuthApi.SignInResponseDto> {
    return this.http.get<AuthApi.SignInResponseDto>(`${this.url}/verify-token`, { withCredentials: true });
  }
}
