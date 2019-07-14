import { Component, OnInit } from '@angular/core';
import { EditQService } from './editQ.service';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Observable } from 'rxjs/Observable';

import { PagerService } from '../_services/index';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../_services/index';
//import { MatDialog } from '@angular/material';
import { QuestionModel } from '../question/questionModel';
import { QuestionEditModel} from './editquestionModel';
import {Quote } from './quote';
import { AnswerEditModel } from './editAnswerModel';





@Component({
    moduleId: module.id.toString(),
    selector: 'editQ.component',
    templateUrl: 'editQ.component.html',
    providers: [EditQService]
})

export class EditQComponent implements OnInit {
    quickAnswerEdit: AnswerEditModel = new AnswerEditModel();
    quickQuestionEdit: QuestionEditModel = new QuestionEditModel();
    quickQuestion: QuestionModel = new QuestionModel();
    display: boolean = false;
    currentUser: User;
    loading = false;
    selectedQuestion: any;
    questions = [];
    answers = [];
    mode = 'general';
    resultQuestion : Quote;
    editPqqId: any;
    editNo: any;
    editHeader: any;
    editNarration: any;
    editPassage: any;



    questionPager: any = {};

    // paged items
    questionPagedItems: any[];


    constructor(
        private router: Router,
        private pagerService: PagerService,
        private alertService: AlertService,
        private _editquestionService: EditQService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }


    ngOnInit() {
        this.selectedQuestion = this._editquestionService.getQuiz()
        console.log('SelectedQuestion', this.selectedQuestion);
        this.getQuestion();

    }

    showDialog() {
        this.display = true;
    }

    ////////////////
    ///////////////// Setting Paged items for questions

    setPage(page: number) {
        if (page < 1 || page > this.questionPager.totalPages) {
            return;
        }

        // get pager object from service
        this.questionPager = this.pagerService.getPager(this.questions.length, page);

        // get current page of items
        this.questionPagedItems = this.questions.slice(this.questionPager.startIndex, this.questionPager.endIndex + 1);
    }


    getQuestion() {
        this._editquestionService.getQustions(this.selectedQuestion.pqh_id)
            .subscribe((response) => {
                console.log('Questions', response);
                this.questions = response;
                 this.resultQuestion = response;
                 console.log('resultedQuestions', this.resultQuestion);
                this.setPage(1);
            },
                (error) => {
                    alert(error);
                    
                });                
                this.mode = 'general';
    }

    onSelect(pqq_id: any){
        this.loading = true;
         console.log('Onselect', pqq_id);
         this._editquestionService.getAnswers(pqq_id)
         .subscribe((response) =>{
             console.log('Answers', response);
             this.answers = response;
             this.loading = false;
         },
        (error) =>{
            alert(error);
            
        });
    }

    editQuestion(pqq_id: any, no: any, header: any, narration:any, passage: any){
              console.log('TobeEdited', pqq_id);
              console.log('No', no);
              this.editPqqId = pqq_id;
              this.editNo = no;
              this.editHeader = header;
              this.editNarration = narration;
              this.editPassage = passage;
              this.quickQuestionEdit.passage_header = header;
              this.quickQuestionEdit.question_narration = narration;
              this.quickQuestionEdit.question_passage = passage;
             // this.resultQuestion = this.questions
             this.mode = 'edit';
    }

    updateSubmit(){
        this.quickQuestionEdit.modified_by = this.currentUser.surname;
        this.quickQuestionEdit.pqh_id = this.selectedQuestion.pqh_id;
        this.quickQuestionEdit.pqq_id = this.editPqqId;
        this.quickQuestionEdit.question_sequence = this.editNo;
        console.log('Updataed Results', this.quickQuestionEdit);
        this._editquestionService.updateQuestion(this.quickQuestionEdit)
        .subscribe((response) =>{
            console.log('UpdatedResponse', response);
            alert('Updated succesfully.');
            this.mode = 'general';
        },
    (error)=>{
        alert(error);
    });
    }

    editAnswers(ans_pqq: any, ans_pqa:any, ans_id: any, ans_narration:any, ans_correct: any, ans_explanation ){
          this.quickAnswerEdit.pqa_id = ans_pqa;  
          this.quickAnswerEdit.answer_id = ans_id;
          this.quickAnswerEdit.pqq_id = ans_pqq;
          this.quickAnswerEdit.correct_yn_explanation = ans_explanation;
          this.quickAnswerEdit.correct_yn = ans_correct;
          this.quickAnswerEdit.answer_narration = ans_narration;
          console.log('QuickAnswerEdit', this.quickAnswerEdit);
          this.mode = 'answeredit';

    }
    answerUpdate(){
        console.log('LastUpdatedAnswer', this.quickAnswerEdit);
        this._editquestionService.updateAnswers(this.quickAnswerEdit)
        .subscribe((response) =>{
            console.log('updated Answers', response);
            alert('Answers Succesfully Updated');
            this.mode = 'general';
            this.display = false;
        },
    (error)=>{
        alert(error);
    })
    }
}


