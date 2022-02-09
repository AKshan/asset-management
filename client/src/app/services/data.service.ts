import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ConfigUrl } from '../app.config';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
    console.log("data service connected...");
  }

  getDevices(): Observable<any>{
    return this.http.get(`${ConfigUrl}devices`);

  }
  postDevices(value:any) : Observable<any>{
    return this.http.post(`${ConfigUrl}devices`, value)
  }
  deleteDevices(id:number): Observable<any>{
    return this.http.delete(`${ConfigUrl}devices/${id}`);
  }
  getInterfaces(id:number): Observable<any>{
    return this.http.get(`${ConfigUrl}interfaces?deviceId=${id}`);
  }
  postInterfaces(value: any): Observable<any>{
    return this.http.post(`${ConfigUrl}interfaces`, value)
  }
  /*postInterfaces(value:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(ConfigUrl.concat(`interfaces`), headers, {params: value});
  }*/
  updateInterfaces(value:any, id:number): Observable<any>{
    return this.http.patch(`${ConfigUrl}interfaces/${id}`, value)
  }
  deleteInterface(id:number): Observable<any>{
    return this.http.delete(`${ConfigUrl}interfaces/${id}`);
  }
}
