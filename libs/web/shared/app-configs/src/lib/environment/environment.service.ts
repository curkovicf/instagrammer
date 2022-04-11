import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT_TOKEN } from './environment.token';
import { IEnvironment } from './environment.interface';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor(@Inject(ENVIRONMENT_TOKEN) private readonly environment: IEnvironment) {}

  public get baseUrl(): string {
    return this.environment.baseUrl;
  }

  public get isProd(): boolean {
    return this.environment.production;
  }
}
