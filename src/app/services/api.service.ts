import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  getRequest(url: string) {
    return this._http.get(`${environment.api_url}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  postRequest(url: string, payload: any) {
    return this._http.post(`${environment.api_url}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }

  putRequest(url: string, payload: any) {
    return this._http.put(`${environment.api_url}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
