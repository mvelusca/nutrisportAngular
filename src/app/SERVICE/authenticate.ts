import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthenticationResponse } from './authentication-response';
import { AuthenticationRequest } from './authentication-request';
import { RequestBuilder } from './request-builder';

export interface Authenticate$Params {
  body: AuthenticationRequest;
}

export function authenticate(
  http: HttpClient,
  rootUrl: string,
  params: Authenticate$Params,
  context?: HttpContext
): Observable<HttpResponse<AuthenticationResponse>> {
  const rb = new RequestBuilder(rootUrl, authenticate.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r): r is HttpResponse<AuthenticationResponse> => r instanceof HttpResponse),
    map((r: HttpResponse<AuthenticationResponse>) => r)
  );
}

authenticate.PATH = '/auth/authenticate';
