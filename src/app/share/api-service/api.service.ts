import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiHost;
  }
  get<T>(uri: string, baseUrl = this.baseUrl) {
    return this.http
      .get<T>(`${baseUrl}/${uri}`, { headers: this.generateHeaders() })
      .pipe(catchError(this.formatErrors));
  }
  formatErrors(e: any) {
    console.log('Captured service error');
    return throwError(e.error);
  }
  download<T>(uri: string, baseUrl = this.baseUrl) {
    let header = this.generateHeaders();
    const options = {
      responseType: 'blob' as 'json',
      headers: header,
    };
    return this.http.get<T>(`${baseUrl}/${uri}`, options);
  }
  post<T>(uri: string, data?: any, baseUrl = this.baseUrl) {
    return this.http
      .post<T>(`${baseUrl}/${uri}`, data, { headers: this.generateHeaders() })
      .pipe(catchError(this.formatErrors));
  }
  getByParams(uri: string, params: HttpParams, baseUrl = this.baseUrl) {
    return this.http.get(`${baseUrl}/${uri}`, {
      headers: this.generateHeaders(),
      params: params,
    });
  }
  put(uri: string, data?: any, baseUrl = this.baseUrl) {
    return this.http.put(`${baseUrl}/${uri}`, data, {
      headers: this.generateHeaders(),
    });
  }
  putCustomResType(
    uri: string,
    data?: any,
    baseUrl = this.baseUrl,
    reponseType?: any
  ) {
    return this.http.put(`${baseUrl}/${uri}`, data, {
      headers: this.generateHeaders(),
      responseType: reponseType,
    });
  }
  delete(uri: string, baseUrl = this.baseUrl) {
    return this.http.delete(`${baseUrl}/${uri}`, {
      headers: this.generateHeaders(),
    });
  }
  postFile(uri: string, data?: any, baseUrl = this.baseUrl) {
    return this.http.post(baseUrl + uri, data, {
      headers: this.generateHeaders(),
    });
  }
  private generateHeaders = () => {
    return new HttpHeaders(environment.requestHeader);
  };
}
