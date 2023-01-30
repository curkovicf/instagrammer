import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  JwtDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  RefreshJwtRequestDto,
  RegisterRequestDto,
  RegisterResponseDto,
  UsernameExistsRequestDto,
  UsernameExistsResponseDto,
} from '@instagrammer/shared-data-access-api-auth-dto';
import { EnvironmentService } from '@instagrammer/web/core/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public readonly url;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    this.url = `${this.environmentService.baseUrl}/auth`;
  }

  public login(loginDto: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.url}/login`, loginDto);
  }

  public checkIfUsernameExists(
    usernameExistsDto: UsernameExistsRequestDto,
  ): Observable<UsernameExistsResponseDto> {
    return this.http.post<UsernameExistsResponseDto>(`${this.url}/username-exists`, usernameExistsDto);
  }

  public register(registerDto: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.url}/register`, registerDto);
  }

  public saveLoginInfo(refreshJwtDto: RefreshJwtRequestDto): Observable<JwtDto> {
    return this.http.post<JwtDto>(`${this.url}/refresh-jwt`, refreshJwtDto);
  }

  public getAccessJwt(): Observable<LoginResponseDto> {
    return this.http.get<LoginResponseDto>(`${this.url}/access-jwt`);
  }

  public logout(logoutDto: LogoutRequestDto): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, logoutDto);
  }
}
