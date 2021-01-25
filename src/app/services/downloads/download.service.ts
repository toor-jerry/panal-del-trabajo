import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor( private http: HttpClient ) { }

  getLinkDonwload = (os: string, arch: string) => {
    const url = `${API_URL}/download/${os}/${arch}`;

    return this.http.get(url)
      .pipe(
        map((res: any) => res.link)
      );
  }
}
