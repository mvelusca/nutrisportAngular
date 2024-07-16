import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseService } from './base-service';
import { ApiConfiguration } from './api-configuration';
import { RequestBuilder } from './request-builder';

// Définir une interface pour le modèle de données des utilisateurs
export interface User {
  id: number;
  nom: string;
  mail: string;
  // Ajoutez d'autres champs si nécessaire
}

// Fonction pour effectuer la requête HTTP et récupérer les utilisateurs
export function getUsers(http: HttpClient, rootUrl: string, context?: HttpContext): Observable<HttpResponse<User[]>> {
  const rb = new RequestBuilder(rootUrl, getUsers.PATH, 'get');

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r): r is HttpResponse<User[]> => r instanceof HttpResponse),
    map((r: HttpResponse<User[]>) => r)
  );
}

getUsers.PATH = '/user/users';

// Service utilisateur
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Cette méthode permet d'accéder à la réponse complète `HttpResponse`, permettant d'accéder aux en-têtes de la réponse.
   * Pour accéder uniquement au corps de la réponse, utilisez `getUsers()` à la place.
   *
   * Cette méthode envoie `application/json` et gère le corps de la requête de type `application/json`.
   */
  getUsers$Response(context?: HttpContext): Observable<HttpResponse<User[]>> {
    return getUsers(this.http, this.rootUrl, context);
  }

  /**
   * Cette méthode permet d'accéder uniquement au corps de la réponse.
   * Pour accéder à la réponse complète (pour les en-têtes, par exemple), utilisez `getUsers$Response()` à la place.
   *
   * Cette méthode envoie `application/json` et gère le corps de la requête de type `application/json`.
   */
  getUsers(context?: HttpContext): Observable<User[]> {
    return this.getUsers$Response(context).pipe(
      map((r: HttpResponse<User[]>) => r.body as User[])
    );
  }
}