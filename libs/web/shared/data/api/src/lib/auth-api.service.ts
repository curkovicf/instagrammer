import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '@instagrammer/web/core/env';
import { UserApi } from '@instagrammer/shared/data/api';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public readonly url;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    this.url = `${this.environmentService.baseUrl}/auth`;
  }

  public login(loginDto: UserApi.LoginRequestDto): Observable<UserApi.LoginResponseDto> {
    return this.http.post<UserApi.LoginResponseDto>(`${this.url}/login`, loginDto);
  }

  public checkIfUsernameExists(
    usernameExistsDto: UserApi.UsernameExistsRequestDto,
  ): Observable<UserApi.UsernameExistsResponseDto> {
    return this.http.post<UserApi.UsernameExistsResponseDto>(`${this.url}/username-exists`, usernameExistsDto);
  }

  public register(registerDto: UserApi.RegisterRequestDto): Observable<UserApi.RegisterResponseDto> {
    return this.http.post<UserApi.RegisterResponseDto>(`${this.url}/register`, registerDto);
  }

  public saveLoginInfo(refreshJwtDto: UserApi.RefreshJwtRequestDto): Observable<UserApi.JwtDto> {
    return this.http.post<UserApi.JwtDto>(`${this.url}/refresh-jwt`, refreshJwtDto);
  }

  public getAccessJwt(): Observable<UserApi.LoginResponseDto> {
    return this.http.get<UserApi.LoginResponseDto>(`${this.url}/access-jwt`);
  }

  public logout(logoutDto: UserApi.LogoutRequestDto): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, logoutDto);
  }
}
