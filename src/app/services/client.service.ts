import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from '../interfaces/client';

import { throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CLIENT_MOCK } from '../models/mock';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    'Access-Control-Allow-Origin': '*',
    //Authorization: 'my-auth-token'
    'MyClientCert': '',        // This is empty
    'MyToken': ''              // This is empty
  })
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private urlClients = 'http://localhost:8080/api';
  private useMock = environment.useMock;

  private client_data: Client[] = [...CLIENT_MOCK];

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window
      .alert(errorMessage);
    return throwError(errorMessage);
  }

  public saveClient(client: Client): Observable<Client> {
    if (this.useMock) {
      const created = { ...client, id: Math.max(-1, ...this.client_data.map(c => c.id)) + 1 };
      this.client_data.push(created);
      return of(created).pipe(delay(400))
    }
    return this.http.post<Client>(this.urlClients + "/client", client, httpOptions).pipe(catchError(this.handleError));
  }

  public getClients(): Observable<Client[]> {
    return this.useMock ?
      of([...this.client_data]).pipe(delay(400)) :
      this.http.get<Client[]>(this.urlClients + "/clients").pipe(catchError(this.handleError));

  }

  public onDelete(clientId: number): Observable<any> {
    if (this.useMock) {
      this.client_data = this.client_data.filter(c => c.id !== clientId)
      return of(this.client_data).pipe(delay(400))
    }
    return this.http.delete(this.urlClients + `/clientes/${clientId}`).pipe(catchError(this.handleError));
  }
}
