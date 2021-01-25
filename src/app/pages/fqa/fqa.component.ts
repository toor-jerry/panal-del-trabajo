import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

import { QuestionService, AnswerService } from "../../services/service.index";
import { TokenInterceptor } from '../../interceptors/token.interceptor';
import { Question, Answer } from "../../models/model.index";
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-fqa',
  templateUrl: './fqa.component.html',
  styles: [
    `.li_hover:hover {
      background-color: rgba(0, 0, 0, 0.4);
  }`]
})
export class FQAComponent implements OnInit {

  questions: Question[];
  from: number = 0;
  total: number = 0;
  loading: boolean = true;
  pages: number = 1;
  page: number = 0;
  auth = false;
  user: User;
  term = ''
  search = false
  constructor(
    private questionsService: QuestionService,
    private answerService: AnswerService,
    private TokenInterceptor: TokenInterceptor,
    private userService: UserService
  ) {
    this.auth = this.userService.getStatusAuth()
    this.user = this.userService.getUserAuth()
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.loading = true;
    this.questionsService.getQuestions(this.from)
      .subscribe((res: any) => {
        this.loading = false;
        this.total = res.total;
        this.pages = Math.ceil(this.total / 10);
        this.questions = res.questions;
      });
  }

  getAnswers(question: Question): void {

    question.loading = true;

    question.from = 10 + question.from || 0;

    if (!question.totalAnswers) {
      question.totalAnswers = 0;
    }
    if ( question.from <= question.totalAnswers ) {

      this.answerService.getAnswers(question._id, question.from)
        .subscribe((res: any) => {
          question.loading = false;
          question.totalAnswers = res.total;
          if (res.total === 0) {
            return;
          }
          if (!question.answers) {
            question.answers = [];
          }

          res.answers.forEach(answer => question.answers.push(answer));
        });
    } else {
      question.loading = false;
    }
  }

  changePagination( fromPage: number, page: number ): void {
    const from = this.from + fromPage;

    if (from >= this.total) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.page += page;
    this.from += fromPage;
    if (this.search) {
      this.getQuestionsSearch()
    } else {
      this.loadQuestions();
    }
  }

  searchFQA( term: string ): void {
    term = term.trim();
    this.loading = true;
    if (term === '' || term === '+' || term === '*' || term === '.') {
      this.from = 0
      this.page = 0
      this.search = false
      this.loadQuestions();
      return;
    }
    if (!this.search) {
      this.from = 0
      this.page = 0
      this.search = true
    }
    this.term = term
    this.getQuestionsSearch()
  }

  getQuestionsSearch() {
    this.questionsService.searchQuestions(this.term, this.from)
    .subscribe( (res: any) => {

      this.loading = false;
      
      if (res.questions?.length > 0) {
        this.questions = res.questions;
      }
      this.total = res.total;
      
      if (this.total > 0) {
        this.pages = Math.ceil(this.total / 10);
      } else {
        this.pages = 1;
      }
    }, err => {
      this.loading = false;
      this.showSwalError(err)
    });
  }


  addQuestion() {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingrese su pregunta",
          type: "text",
        },
      },
      buttons: {
        confirm: true,
        cancel: true,
      },
    })
    .then( res => {
      if (res) {
        this.showLoading()
        this.questionsService.create(res)
        .subscribe(res => {
          
          let question = res;
          question.user = this.user;
          this.questions.unshift(question)
            swal({
              title: 'Pregunta creada!',
              icon: 'info'
            });
            this.total +=1
        }, err => {
          this.showSwalError(err);
        });
      }
      
    });
  }
  addResponse(question: Question) {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingrese su pregunta",
          type: "text",
        },
      },
      buttons: {
        confirm: true,
        cancel: true,
      },
    })
    .then( res => {
      if (res) {
        this.showLoading()
        this.answerService.create(question._id,res)
        .subscribe(res => {
          res.user = this.user
          
          question.answers = question.answers || []
          if (!question.totalAnswers) {
            question.totalAnswers = 0
          }
          question.totalAnswers +=1
          question.answers.push(res)
          swal('Respuesta agregada!', '', 'success')
        }, err => {
          this.showSwalError(err);
        });
      }
      
    });
  }

  updateQuestion(question: Question) {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Reformule su pregunta",
          type: "text",
        },
      },
      buttons: {
        confirm: true,
        cancel: true,
      },
    })
    .then( res => {
      if (res) {
        this.showLoading()
        this.questionsService.update(question._id, res)
        .subscribe(() => {
          swal('Pregunta actualizada!', `'${question.question}' ha sido actualizada a '${res}'`, 'success')
          question.question = res
        }, err => {
          this.showSwalError(err);
        });
      }
      
    });
  }

  updateAnswer(question: Question, answer: Answer) {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Reformule su respuesta",
          type: "text",
        },
      },
      buttons: {
        confirm: true,
        cancel: true,
      },
    })
    .then( res => {
      if (res) {
        this.showLoading()
        this.answerService.update(question._id, answer._id, res)
        .subscribe(() => {
          swal('Respuesta actualizada!', `'${answer.answer}' ha sido actualizada a '${res}'`, 'success')
          answer.answer = res
        }, err => {
          this.showSwalError(err);
        });
      }
      
    });
  }

  deleteQuestion(question: Question) {
    swal({
      title: '¿Se encuentra segur@?',
      text: 'Está opción eliminará de manera PERMANENTE la pregunta junto a todas las respuestas que contenga.',
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.questionsService.delete(question._id)
          .subscribe( (resp: any) => {
            swal('Pregunta eliminada correctamente!', `Respuestas eliminadas: ${resp.totalDeleted}`, 'success');
            this.questions = this.questions.filter( questionTmp => {
              if (''+questionTmp._id !== ''+question._id) {
                return questionTmp;
              }
            });
            this.total -=1
          }, err => swal('Ocurrio un error!', `No se pudo eliminar la pregunta!! \n${err}`, 'error'));
      }
    });
  }

  deleteAnswer(question: Question, answer: Answer) {
    swal({
      title: '¿Se encuentra segur@?',
      text: 'Está opción eliminará de manera PERMANENTE la respuesta: '+answer.answer,
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.answerService.delete(answer._id)
          .subscribe( (resp: any) => {
            swal('Respuesta eliminada correctamente!', `Respuestas eliminadas: ${resp.totalDeleted}`, 'success');
            question.answers = question.answers.filter( answerTmp => {
              if (''+answerTmp._id !== ''+answer._id) {
                return answerTmp;
              }
            });
            question.totalAnswers -= 1
          }, err => swal('Ocurrio un error!', `No se pudo eliminar la respuesta!! \n${err}`, 'error'));
      }
    });
  }

  showLoading() {
    swal({
      title: 'Espere por favor...',
      icon: '../../../assets/img/Wedges-3s-200px.svg',
      buttons: [false, false],
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
  }
  showSwalError(err) {
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }
}
