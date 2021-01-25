import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { Answer } from "../../models/model.index";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  term: string;

  constructor( private http: HttpClient ) { }

  // Data
  private answers: Answer[] = [];

  getAnswers = (question: string, from: number = 0) => {
    const url = `${API_URL}/answer/question/${question}?from=${from}`;

    return this.http.get(url)
        .pipe(
          map((res: any) => {
            
            return {
              answers: res.data,
              total: res.total
            };
          })
        );
  }
  create(question: string,answer: string) {
    const url = `${API_URL}/answer`;

    return this.http.post(url, {question, answer})
      .pipe(
        map((res: any) => res.data));
  }

  update(question: string, answerId: string,newAnswer: string) {
    const url = `${API_URL}/answer/${answerId}`;

    return this.http.put(url, {question, answer: newAnswer})
  }

  delete(answerId: string) {
    const url = `${API_URL}/answer/${answerId}`;

    return this.http.delete(url)
  }

  searchAnswer = ( term: string ): Answer[] => {
    let questionsArr:Answer[] = [];
    term = term.toLowerCase();

    for( let questionTemp of this.answers ){

      let search = questionTemp.question.toLowerCase() + " " + questionTemp.answer.toLowerCase();

      if ( search.indexOf( term ) >= 0 ){
        questionsArr.push( questionTemp );
      }
    }
    return questionsArr;
  }
}
