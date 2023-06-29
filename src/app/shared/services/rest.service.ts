import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

interface HttpOptions {
  headers?:
  | HttpHeaders
  | {
      [header: string]: string | string[];
  };
  observe?: 'body';
  params?:
  | HttpParams
  | {
      [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class RestService {
  private API_URL: string="http://localhost/ATW2/ATW2_php/api/v1/";
  private options: HttpOptions;
  constructor(private http: HttpClient) {
    const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        this.options = {
            headers: headers,
            withCredentials: true
      };
   }

  request(endpoint:string, params:any = {}){
    return new Promise((resolve,reject)=>{
      const url:string=this.API_URL+endpoint;

      this.http.post(url,params, this.options).subscribe(
        response => {
          // Handle the response
          console.log(response);
          resolve(response);
        },
        error => {
          // Handle the error
          // console.error(error);
          reject(error);
        }
      );
    })
  }


 

}

