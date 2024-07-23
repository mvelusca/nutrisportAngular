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
  mdp: string;
  photo: string;
  // Ajoutez d'autres champs si nécessaire
}

export interface AddUser{
  nom: string;
  mail: string;
  mdp: string;
  photo: string;
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

// Fonction pour effectuer la requête HTTP PUT et mettre à jour un utilisateur
export function updateUser(http: HttpClient, rootUrl: string, id: number, user: User, context?: HttpContext): Observable<HttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, updateUser.PATH.replace('{id}', id.toString()), 'put');
  rb.body(user, 'application/json'); // Set the body here
  return http.request(
    rb.build({
      responseType: 'json',
      accept: 'application/json',
      context
    })
  ).pipe(
    filter((r): r is HttpResponse<User> => r instanceof HttpResponse),
    map((r: HttpResponse<User>) => r)
  );
}

updateUser.PATH = '/user/{id}';

// Fonction pour effectuer la requête HTTP DELETE et supprimer un utilisateur
export function deleteUser(http: HttpClient, rootUrl: string, id: number, context?: HttpContext): Observable<HttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, deleteUser.PATH.replace('{id}', id.toString()), 'delete');
  return http.request(
    rb.build({
      responseType: 'json',
      accept: 'application/json',
      context
    })
  ).pipe(
    filter((r): r is HttpResponse<void> => r instanceof HttpResponse),
    map((r: HttpResponse<void>) => r)
  );
}

deleteUser.PATH = '/user/{id}';

// Fonction pour effectuer la requête HTTP POST et ajouter un utilisateur
export function addUser(http: HttpClient, rootUrl: string, user: AddUser, context?: HttpContext): Observable<HttpResponse<AddUser>> {
  const rb = new RequestBuilder(rootUrl, addUser.PATH, 'post');
  rb.body(user, 'application/json');
  return http.request(
    rb.build({
      responseType: 'json',
      accept: 'application/json',
      context
    })
  ).pipe(
    filter((r): r is HttpResponse<AddUser> => r instanceof HttpResponse),
    map((r: HttpResponse<AddUser>) => r)
  );
}

addUser.PATH = '/user/add';

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

  /**
   * Cette méthode permet d'accéder à la réponse complète `HttpResponse` pour la mise à jour d'un utilisateur.
   * Pour accéder uniquement au corps de la réponse, utilisez `updateUser()` à la place.
   *
   * Cette méthode envoie `application/json` et gère le corps de la requête de type `application/json`.
   */
  updateUser$Response(id: number, user: User, context?: HttpContext): Observable<HttpResponse<User>> {
    return updateUser(this.http, this.rootUrl, id, user, context);
  }

  /**
   * Cette méthode permet d'accéder uniquement au corps de la réponse.
   * Pour accéder à la réponse complète (pour les en-têtes, par exemple), utilisez `updateUser$Response()` à la place.
   *
   * Cette méthode envoie `application/json` et gère le corps de la requête de type `application/json`.
   */
  updateUser(id: number, user: User, context?: HttpContext): Observable<User> {
    return this.updateUser$Response(id, user, context).pipe(
      map((r: HttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Cette méthode permet d'accéder à la réponse complète `HttpResponse` pour la suppression d'un utilisateur.
   * Pour accéder uniquement au corps de la réponse, utilisez `deleteUser()` à la place.
   *
   * Cette méthode envoie `application/json` et gère le corps de la requête de type `application/json`.
   */
  deleteUser$Response(id: number, context?: HttpContext): Observable<HttpResponse<void>> {
    return deleteUser(this.http, this.rootUrl, id, context);
  }

  /**
   * Cette méthode permet d'accéder uniquement au corps de la réponse.
   * Pour accéder à la réponse complète (pour les en-têtes, par exemple), utilisez `deleteUser$Response()` à la place.
   *
   * Cette méthode envoie `application/json` et gère le corps de la requête de type `application/json`.
   */
  deleteUser(id: number, context?: HttpContext): Observable<void> {
    return this.deleteUser$Response(id, context).pipe(
      map((r: HttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Cette méthode permet d'accéder à la réponse complète `HttpResponse` pour l'ajout d'un utilisateur.
   * Pour accéder uniquement au corps de la réponse, utilisez `addUser()` à la place.
   *
   * Cette méthode envoie `application/json` et gère le corps de la requête de type `application/json`.
   */
  addUser$Response(user: AddUser, context?: HttpContext): Observable<HttpResponse<AddUser>> {
    return addUser(this.http, this.rootUrl, user, context);
  }

  /**
   * Cette méthode permet d'accéder uniquement au corps de la réponse.
   * Pour accéder à la réponse complète (pour les en-têtes, par exemple), utilisez `addUser$Response()` à la place.
   *
   * Cette méthode envoie `application/json` et gère le corps de la requête de type `application/json`.
   */
  addUser(user: AddUser, context?: HttpContext): Observable<AddUser> {
    return this.addUser$Response(user, context).pipe(
      map((r: HttpResponse<AddUser>) => r.body as AddUser)
    );
  }


}