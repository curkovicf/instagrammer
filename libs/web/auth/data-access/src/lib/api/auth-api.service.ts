import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@instagrammer/web/shared/app-configs';
import { Observable } from 'rxjs';
import {
  LoginResponseDto,
  RegisterResponseDto,
  UsernameExistsResponseDto,
} from '@instagrammer/shared/data-access/api-dtos';
import { LoginDto, RefreshJwtDto, RegisterDto, UsernameExistsDto } from '@instagrammer/api/auth/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public readonly url;

  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService,
  ) {
    this.url = `${this.environmentService.baseUrl}/auth`;
  }

  public login(loginDto: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.url}/login`, loginDto, {
      withCredentials: true,
    });
  }

  public checkIfUsernameExists(
    usernameExistsDto: UsernameExistsDto,
  ): Observable<UsernameExistsResponseDto> {
    return this.http.post<UsernameExistsResponseDto>(
      `${this.url}/username-exists`,
      usernameExistsDto,
    );
  }

  public register(registerDto: RegisterDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.url}/register`, registerDto);
  }

  public requestPermanentJwtToken(refreshJwtDto: RefreshJwtDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.url}/refresh-jwt`, refreshJwtDto);
  }
}
