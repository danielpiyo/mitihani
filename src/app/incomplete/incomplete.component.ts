
import { Component } from '@angular/core';
import { IncompleteService } from './incomplete.service';
import { UserService, PagerService } from '../_services/index';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import { EditQService } from '../editquestion/editQ.service';
import { AnswerEditModel } from '../editquestion/editAnswerModel';
import { QuestionEditModel } from '../editquestion/editquestionModel';
import { QuestionModel } from '../question/questionModel';
import { AnswerModel } from '../question/answerModel';
import { QuestionService } from '../question/question.service';
import { SetModel } from './setModel';


@Component({
    moduleId: module.id.toString(),
    selector: 'incomplete.component',
    templateUrl: 'incomplete.component.html',
    providers: [IncompleteService]
})

export class IncompleteComponent {
    quickSet: SetModel = new SetModel();
    quickQuestion: QuestionModel = new QuestionModel();
    quickAnswer: AnswerModel = new AnswerModel();
    quickAnswerEdit: AnswerEditModel = new AnswerEditModel();
    quickQuestionEdit: QuestionEditModel = new QuestionEditModel();
    editPqqId: any;
    editNo: any;
    editHeader: any;
    editNarration: any;
    editPassage: any;
    display: boolean = false;
    mode = 'incomplete';
    incompleteQuestions = [];
    questions = [];
    answers = [];
    currentUser: User;
    users: User[] = [];
    selectedPqh_id: any
    selectedClass: any;
    selectedSubject: any;
    pqqId: Number;
    selectedRequired_id: any;
    //   paginate(event) {}


    questionPager: any = {};

    // paged items
    questionPagedItems: any[];

    constructor(
        private router: Router,
        private _questionService: QuestionService,
        private pagerService: PagerService,
        private _editquestionService: EditQService,
        private _incompleteService: IncompleteService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


        //this.currentStarted = JSON.parse(localStorage.getItem('startSetting'));
    }

    ngOnInit() {
        // this.loadAllUsers();  
        this.getIncomplte();
    }

    getIncomplte() {
        this._incompleteService.getIncomplete(this.currentUser.entity_sys_id)
            .subscribe((response) => {
                console.log('Incomplete', response);
                this.incompleteQuestions = response;
                this.mode = 'incomplete';
            },
                (error) => {
                    console.log('Error', error.message);
                    alert(error.message);
                    this.router.navigate(['/set']);
                });
    }


    setPage(page: number) {
        if (page < 1 || page > this.questionPager.totalPages) {
            return;
        }

        // get pager object from service
        this.questionPager = this.pagerService.getPager(this.questions.length, page);

        // get current page of items
        this.questionPagedItems = this.questions.slice(this.questionPager.startIndex, this.questionPager.endIndex + 1);
    }

    getQuestion(pqh_id: any, class_level: any, subject: any) {
        this.selectedPqh_id = pqh_id;
        this.selectedClass = class_level;
        this.selectedSubject = subject;
        this._editquestionService.getQustions(pqh_id)
            .subscribe((response) => {
                console.log('Questions', response);
                this.questions = response;
                console.log('pqh_id', pqh_id);
                this.setPage(1);
            },
                (error) => {
                    alert(error);

                });
        this.mode = 'general';
    }

    loading :any;

    onSelect(pqq_id: any) {
        this.loading = true;
        this.selectedRequired_id = pqq_id;
        console.log('Onselect', pqq_id);
        this._editquestionService.getAnswers(pqq_id)
            .subscribe((response) => {

                  this.answers = response;
                  console.log('Answers', response);
              
                //this.loading = false;
            },
                (error) => {
                    alert(error);
                    console.log('Error', error);
                    this.mode = 'addanswer';

                });
    }


    editQuestion(pqq_id: any, no: any, header: any, narration: any, passage: any) {
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

    updateSubmit() {
        this.quickQuestionEdit.modified_by = this.currentUser.surname;
        this.quickQuestionEdit.pqh_id = this.selectedPqh_id;
        this.quickQuestionEdit.pqq_id = this.editPqqId;
        this.quickQuestionEdit.question_sequence = this.editNo;
        console.log('Updataed Results', this.quickQuestionEdit);
        this._editquestionService.updateQuestion(this.quickQuestionEdit)
            .subscribe((response) => {
                console.log('UpdatedResponse', response);
                alert('Updated succesfully.');
                this.mode = 'general';
            },
                (error) => {
                    alert(error);
                });
    }

    editAnswers(ans_pqq: any, ans_pqa: any, ans_id: any, ans_narration: any, ans_correct: any, ans_explanation) {
        this.quickAnswerEdit.pqa_id = ans_pqa;
        this.quickAnswerEdit.answer_id = ans_id;
        this.quickAnswerEdit.pqq_id = ans_pqq;
        this.quickAnswerEdit.correct_yn_explanation = ans_explanation;
        this.quickAnswerEdit.correct_yn = ans_correct;
        this.quickAnswerEdit.answer_narration = ans_narration;
        console.log('QuickAnswerEdit', this.quickAnswerEdit);
        this.mode = 'answeredit';

    }
    answerUpdate() {
        console.log('LastUpdatedAnswer', this.quickAnswerEdit);
        this._editquestionService.updateAnswers(this.quickAnswerEdit)
            .subscribe((response) => {
                console.log('updated Answers', response);
                alert('Answers Succesfully Updated');
                this.mode = 'general';
                this.display = false;
            },
                (error) => {
                    alert(error);
                })
    }



    questionSubmit() {
        //this.loading = true;
        this.quickQuestion.pqh_id = this.selectedPqh_id;
        console.log('SubmittedQuestion', this.quickQuestion);
        this._questionService.questioSet(this.quickQuestion)
            .subscribe((response) => {
                this.pqqId = response.user.pqq_id;
                console.log('QuestionResponse', response.user.pqq_id)
                this.quickQuestion.passage_header = '';
                this.quickQuestion.question_narration = '';
                this.quickQuestion.question_passage = '';
                this.quickQuestion.question_sequence = 0;
                this.mode = 'answer'
            },
                (error) => {
                    alert(error);
                });

    }

    answerSubmit() {
        this.quickAnswer.pqq_id = this.pqqId;
        this.quickAnswer.pqq_id = this.selectedRequired_id;
        console.log('Answers', this.quickAnswer);
        this._questionService.answerSet(this.quickAnswer)
            .subscribe((response) => {
                alert('you Have succesfully Saved Answer' + ' ' + this.quickAnswer.answer_id);
                console.log('RespondedAnswer', response);
                this.quickAnswer.answer_id = '';
                this.quickAnswer.answer_narration = '';
                this.quickAnswer.correct_yn = '';
                this.quickAnswer.correct_yn_explanation = '';
            },
                (error) => {
                    alert(error)
                });
    }

    answerAdding() {
        this.quickAnswer.pqq_id = this.pqqId;
        //this.quickAnswer.pqq_id = this.selectedRequired_id;
        console.log('Answers', this.quickAnswer);
        this._questionService.answerSet(this.quickAnswer)
            .subscribe((response) => {
                alert('you Have succesfully Saved Answer' + ' ' + this.quickAnswer.answer_id);
                console.log('RespondedAnswer', response);
                this.quickAnswer.answer_id = '';
                this.quickAnswer.answer_narration = '';
                this.quickAnswer.correct_yn = '';
                this.quickAnswer.correct_yn_explanation = '';
            },
                (error) => {
                    alert(error)
                });
    }


    setQuiz(selecPqh_id: any, createdBy: any){
        this.quickSet.pqh_id = selecPqh_id;
        this.quickSet.created_by = createdBy;
        console.log('QuickSet', this.quickSet);
        this._incompleteService.setQuiz(this.quickSet)
        .subscribe((response)=>{
            console.log('Result',response);
            alert('Quiz Set Succesfully');
            this.router.navigate(['/set']);
        },
    (error)=>{
        alert(error.message);
        this.mode = 'incomplete';
    })
    }

    showDialog() {
        this.display = true;
    }

  
}

