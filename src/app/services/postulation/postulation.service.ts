import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  constructor(
    private http: HttpClient
  ) { }

  getPostulations = ( from: number = 0) => {
    let url = `${API_URL}/postulation/all-by-user?from=${from}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return {
          postulations: res.data,
          total: res.total
        };
      }));
  }

  getPostulationsByEmployments = ( from: number = 0) => {
    let url = `${API_URL}/postulation/all-by-user/employments?from=${from}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return {
          postulations: res.data,
          total: res.total
        };
      }));
  }
  getPostulationsBySocialService = ( from: number = 0) => {
    let url = `${API_URL}/postulation/all-by-user/social-service?from=${from}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return {
          postulations: res.data,
          total: res.total
        };
      }));
  }

  getPostulationsByProfessionalPractiece = ( from: number = 0) => {
    let url = `${API_URL}/postulation/all-by-user/professional-practice?from=${from}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        return {
          postulations: res.data,
          total: res.total
        };
      }));
  }

  createPostulation = (employment: string) => {
    let url = `${API_URL}/postulation`;

    return this.http.post(url, {employment}).pipe(
      map((res: any) => {
        
        return true
      }));
  }

}
