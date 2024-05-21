import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RequestBuilder } from './request-builder';

import { RegistrationRequest } from './registration-request';

export interface Register$Params {
      body: RegistrationRequest
}

export function register(http: HttpClient, rootUrl: string, params: Register$Params, context?: HttpContext): Observable<{
}> {
  const rb = new RequestBuilder(rootUrl, register.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as {
      };
    })
  );
}

register.PATH = '/auth/register';