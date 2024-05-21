import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from './request-builder';


export interface Confirm$Params {
  token: string;
}

export function confirm(http: HttpClient, rootUrl: string, params: Confirm$Params, context?: HttpContext): Observable<any> {
  const rb = new RequestBuilder(rootUrl, confirm.PATH, 'get');
  if (params) {
    rb.query('token', params.token, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as {};
    })
  );
}

confirm.PATH = '/auth/activate-account';