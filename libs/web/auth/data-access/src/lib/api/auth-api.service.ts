import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@instagrammer/web/shared/app-configs';
import { Observable } from 'rxjs';
import { LoginResponseDto, RegisterResponseDto, UsernameExistsResponseDto } from '@instagrammer/shared/data-access/api-dtos';
import { LoginDto, LogoutDto, RefreshJwtDto, RegisterDto, UsernameExistsDto } from '@instagrammer/api/auth/data-access';
import { JwtTokenDto } from '../../../../../../api/auth/data-access/src/lib/dto/token-pair.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public readonly url;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    this.url = `${this.environmentService.baseUrl}/auth`;
  }

  public login(loginDto: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.url}/login`, loginDto, {
      withCredentials: true,
    });
  }

  public checkIfUsernameExists(usernameExistsDto: UsernameExistsDto): Observable<UsernameExistsResponseDto> {
    return this.http.post<UsernameExistsResponseDto>(`${this.url}/username-exists`, usernameExistsDto);
  }

  public register(registerDto: RegisterDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.url}/register`, registerDto);
  }

  public saveLoginInfo(refreshJwtDto: RefreshJwtDto): Observable<JwtTokenDto> {
    return this.http.post<JwtTokenDto>(`${this.url}/refresh-jwt`, refreshJwtDto, {
      withCredentials: true,
    });
  }

  public getAccessJwt(): Observable<string> {
    return this.http.get<string>(`${this.url}/access-jwt`, {
      withCredentials: true,
    });
  }

  public logout(logoutDto: LogoutDto): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, logoutDto);
  }
}
