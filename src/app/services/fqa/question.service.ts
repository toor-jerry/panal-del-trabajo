import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_URL } from '../../config/config';
import { Question } from '../../models/fqa/question.model';
import { UsersService } from '../profile/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor( private http: HttpClient, private userService: UsersService) {}

  getQuestions = (from: number = 0, limit: number = 10) => {
    const url = `${API_URL}/question?from=${from}`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          return {
            questions: res.data,
            total: res.total
          };
        })
      );
  }
  
  update(question: string, newQuestion: string) {
    const url = `${API_URL}/question/${question}`;

    return this.http.put(url, {question: newQuestion})
      .pipe(
        map((res: any) => res.data));
  }

  delete(question: string) {
    const url = `${API_URL}/question/${question}`;

    return this.http.delete(url)
  }

  create(question: string) {
    const url = `${API_URL}/question`;

    return this.http.post(url, {question})
      .pipe(
        map((res: any) => res.data));
  }

  searchQuestions = (term: string, from: number = 0) => {
    const url = `${API_URL}/search/no-auth/question/${term}?from=${from}`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          let data =res.data
          return {
            questions: data.data,
            total: data.total
          };
        })
      );
  }

}
