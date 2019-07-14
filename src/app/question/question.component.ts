import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { Policies } from './policies';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { QuestionModel } from './questionModel';
import { AnswerModel } from './answerModel';
import {SetModel } from '../incomplete/setModel';

@Component({
    moduleId: module.id.toString(),
    selector: 'question.component',
    templateUrl: 'question.component.html',
    providers: [QuestionService]
})

export class QuestionComponent implements OnInit {
    quickSet: SetModel = new SetModel();
    quickQuestion: QuestionModel = new QuestionModel();
    quickAnswer: AnswerModel = new AnswerModel();
    currentUser: User;
    users: User[] = [];
    pqqId: Number;
    mode = 'question'
    selectedQuestion: any;


    constructor(
        private router: Router,
        private _questionService: QuestionService,
        private userService: UserService)
         {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }


    ngOnInit() {
      this.selectedQuestion = this._questionService.getQuiz();
        console.log('LocalStorage', this.selectedQuestion);
       
    }

questionSubmit(){
        //this.loading = true;
        this.quickQuestion.pqh_id = this.selectedQuestion.pqh_id;
        console.log('SubmittedQuestion', this.quickQuestion);
        this._questionService.questioSet(this.quickQuestion)
        .subscribe((response) =>{
            this.pqqId = response.user.pqq_id;
            console.log('QuestionResponse', response.user.pqq_id)
            this.quickQuestion.passage_header = '';
            this.quickQuestion.question_narration = '';
            this.quickQuestion.question_passage = '';
            this.quickQuestion.question_sequence = 0;
            this.mode = 'answer'
        },
    (error)=>{
        alert(error);
    });
       
    }

    answerSubmit(){   
        this.quickAnswer.pqq_id = this.pqqId;     
        console.log('Answers', this.quickAnswer);
        this._questionService.answerSet(this.quickAnswer)
        .subscribe((response) =>{
            alert('you Have succesfully Saved Answer' + ' '+ this.quickAnswer.answer_id);
            console.log('RespondedAnswer', response);
            this.quickAnswer.answer_id = '';
            this.quickAnswer.answer_narration = '';
            this.quickAnswer.correct_yn = '';
            this.quickAnswer.correct_yn_explanation = '';
        },
    (error)=>{
        alert(error)
    });
    }

    backToHeader(){
        this.router.navigate(['/set']);
    }

    goToQuestion(){
        this.router.navigate(['/questions']);
    }

    setQuiz(selecPqh_id: any, createdBy: any){
       
        this.quickSet.created_by = createdBy;
        this.quickSet.pqh_id = selecPqh_id;
        console.log('QiuckSet', this.quickSet);
        this._questionService.finalSetQuiz(this.quickSet)
        .subscribe((response)=>{
            console.log('Result', response);
            alert('Quiz Set Succesfully');
            this.router.navigate(['/set']);
        },
    (error)=>{
        alert(error.message);
        this.mode = 'question';
    });
    }
}  
