import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@instagrammer/web/shared/app-configs';
import { Observable } from 'rxjs';
import { LoginRequestDto, LoginResponseDto } from '@instagrammer/shared/data-access/api-dtos';

@Injectable()
export class AuthApiService {
  public readonly url;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    this.url = `${this.environmentService.baseUrl}/auth/login`;
  }

  public login(credentials: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(this.url, credentials);
  }
}
