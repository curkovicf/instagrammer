import { InjectionToken } from '@angular/core';
import { IEnvironment } from './environment.interface';

export const ENVIRONMENT_TOKEN = new InjectionToken<IEnvironment>('ENVIRONMENT');
