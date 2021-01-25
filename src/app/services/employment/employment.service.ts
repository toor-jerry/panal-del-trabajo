import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { Employment } from "../../models/model.index";
import { API_URL } from './../../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmploymnetService {

  // Data
  private employments: Employment[];

  constructor(
    private http: HttpClient) { }

  getEmploymentsDB = ( from: number = 0) => {
    let url = `${API_URL}/employment`;
    if ( !localStorage.getItem('token') ) {
        url += '/no-auth';
    }

    return this.http.get(`${url}?from=${from}`).pipe(
      map((res: any) => {
        let data = res.data;
        
        return {
          employments: data.employments,
          postulations: data.postulations,
          total: res.total
        };
      }));
  }

  getOnlyEmploymentsDB = ( from: number = 0) => {
    let url = `${API_URL}/employment/employments-whitout-postulations`;

    return this.http.get(`${url}?from=${from}`).pipe(
      map((res: any) => {
        let data = res.data;
        
        return {
          employments: data.employments,
          // postulations: data.postulations,
          total: res.total
        };
      }));
  }

  getOnlySocietyServiceDB = ( from: number = 0) => {
    let url = `${API_URL}/employment/society-service-whitout-postulations`;

    return this.http.get(`${url}?from=${from}`).pipe(
      map((res: any) => {
        
        let data = res.data;
        return {
          employments: data.employments,
          // postulations: data.postulations,
          total: res.total
        };
      }));
  }

  getOnlyProfessionalPracticeDB = ( from: number = 0) => {
    let url = `${API_URL}/employment/professional-practice-whitout-postulations`;

    return this.http.get(`${url}?from=${from}`).pipe(
      map((res: any) => {
        let data = res.data;
        
        return {
          employments: data.employments,
          // postulations: data.postulations,
          total: res.total
        };
      }));
  }
  updateEmployment(employment: Employment) {
    let url = `${API_URL}/employment/${employment._id}`;

    return this.http.put(url, employment)
      .pipe(
        map((res: any) => {
      return res.data;
    }));
  }

  getEmploymentsByEnterpriseDB = ( from: number = 0, route: string = 'enterprise/all'  ) => {
    let url = `${API_URL}/employment/${route}`;

    return this.http.get(`${url}?from=${from}`).pipe(
      map((res: any) => {
        return {
          employments: res.data,
          total: res.total
        };
      }));
  }

  createEmployment = ( employment: Employment ) => {
    let url = `${API_URL}/employment`;

    return this.http.post(url, employment).pipe(
      map((res: any) => res.data));
  }

  getEmployments = (): Employment[] => this.employments;

  getEmployment = ( id: string ) => {
    let url = API_URL + '/employment/' + id;

    return this.http.get(url).pipe(
      map((res: any) => {
        let employment: Employment = res.data;
        employment.total = res.total;
        return employment;
      }));
  }

  searchEmployment = ( term: string, from: number = 0 ) => {
    let url = API_URL + '/search';
    if ( !localStorage.getItem('token') ) {
        url += '/no-auth';
    } else {
      url += '/specific/employments';
    }

    url += '/' + term;

    return this.http.get(`${url}?from=${from}`).pipe(
      map((res: any) => {
        return {
          employments: res.employments,
          total: res.total
        };
      }));
    }

    countSocialService = () => {
      let url = `${API_URL}/employment/count/social-service`;
  
      return this.http.get(url).pipe(
        map((res: any) => {return res}));
      }

      countProfessionalPratice = () => {
        let url = `${API_URL}/employment/count/professional-practice`;
    
        return this.http.get(url).pipe(
          map((res: any) => {  return res}));
        }

    searchOnlyEmployments = ( term: string, from: number = 0 ) => {
      let url = `${API_URL}/search/specific/only_employments/${term}?from=${from}`;
  
      return this.http.get(url).pipe(
        map((res: any) => {
          
          return {
            employments: res.only_employments,
            total: res.total
          };
        }));
      }

      searchSocietyService = ( term: string, from: number = 0 ) => {
        let url = `${API_URL}/search/specific/society_service/${term}?from=${from}`;
    
        return this.http.get(url).pipe(
          map((res: any) => {
            return {
              employments: res.society_service,
              total: res.total
            };
          }));
        }
        searchProfessionalPractices = ( term: string, from: number = 0 ) => {
          let url = `${API_URL}/search/specific/professional_practices/${term}?from=${from}`;
      
          return this.http.get(url).pipe(
            map((res: any) => {
              return {
                employments: res.professional_practices,
                total: res.total
              };
            }));
          }

    deleteEmployment = ( idEmployment: string ) => {
      const url = API_URL + '/employment/'+ idEmployment;

      return this.http.delete(url)
      .pipe(
        map(res => {
          swal('Oferta de empleo eliminada correctamente.', '', 'success');
          return true;
        })
      );
    }
}
