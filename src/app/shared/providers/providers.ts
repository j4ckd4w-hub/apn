import { InjectionToken, Provider } from '@angular/core';
import { environment } from '../../../environments/environment';

export const ApiUrl = new InjectionToken<string>('apiUrl')

export const providers: Provider[] = [
  { provide: ApiUrl, useValue: environment.apiUrl }
]
