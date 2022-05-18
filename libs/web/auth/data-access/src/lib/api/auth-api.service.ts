import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@instagrammer/web/shared/app-configs';
import { Observable } from 'rxjs';
import {
  LoginResponseDto,
  UsernameExistsResponseDto,
} from '@instagrammer/shared/data-access/api-dtos';
import { LoginDto, UsernameExistsDto } from '@instagrammer/api/auth/data-access';

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
    return this.http.post<LoginResponseDto>(`${this.url}/login`, loginDto);
  }

  public checkIfUsernameExists(
    usernameExistsDto: UsernameExistsDto,
  ): Observable<UsernameExistsResponseDto> {
    return this.http.post<UsernameExistsResponseDto>(
      `${this.url}/username-exists`,
      usernameExistsDto,
    );
  }
}
