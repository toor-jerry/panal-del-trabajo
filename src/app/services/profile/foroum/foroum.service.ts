import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ForoumService {

  constructor( private http: HttpClient ) { }

  getAllForoums = (from) => {
    const url = `${API_URL}/room/foroums?from=${from}`;

    return this.http.get( url )
      .pipe(
        map((res: any) => {
          let data = res.data
          return {
            foros: data.data,
            total: data.total
          }
        })
      );
  }

  getAllMyForoums = (from: number) => {
    const url = `${API_URL}/room/my-foroums?from=${from}`;

    return this.http.get( url )
      .pipe(
        map((res: any) => {
          let data = res.data
          
          return {
            foros: data.data,
            total: data.total
          }
        })
      );
  }

  countAndGetAllForoums = (from = 0) => {
    const url = `${API_URL}/room/get-and-count-foroums?from=${from}`;

    return this.http.get( url )
      .pipe(
        map((res: any) => {
          let data = res.data
          
          return {
            myForos: data.count.myForos,
            allForos: data.foros.total,
            foros: data.foros.data
          }
        })
      );
  }

}
