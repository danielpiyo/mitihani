
import { Component } from '@angular/core';
import { CompleteService } from './complete.service';
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



@Component({
    moduleId: module.id.toString(),
    selector: 'complete.component',
    templateUrl: 'complete.component.html',
    providers: [CompleteService]
})

export class CompleteComponent {

    
    display: boolean = false;
    mode = 'complete';
    completeQuestions = [];
    currentUser: User;
    users: User[] = [];
    questions = [];
    selectQuizNo: any;
    selectedDescription: any;

    questionPager: any = {};

    // paged items
    questionPagedItems: any[];

    constructor(
        private router: Router,
        private pagerService: PagerService,
        private _completeService: CompleteService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


        //this.currentStarted = JSON.parse(localStorage.getItem('startSetting'));
    }

    ngOnInit() {
        // this.loadAllUsers();  
        this.getComplete();
       
    }

getComplete(){
    this._completeService.getComplete(this.currentUser.entity_sys_id)
    .subscribe((response)=>{
      this.completeQuestions = response;
      console.log('CompleteQuestion', this.completeQuestions);
    },
(error)=>{
    alert(error.message + '.' + '' + error.detailed_message);
    this.router.navigate(['/set']);
});
this.mode = 'complete';
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

  
    viewDetails(quiz_no:any, description:any){
        this.selectedDescription = description;
        this.selectQuizNo = quiz_no;
        this.mode = 'details';

    }

    showDialog() {
        this.display = true;
    }


}

