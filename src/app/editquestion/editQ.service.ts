import { Injectable } from '@angular/core';  
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http'; 
import { HttpParams, HttpClient } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';  
import {  Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import 'rxjs/add/operator/catch';
//import { Quote } from '../quotsummary/quote';
import * as _ from 'underscore';
import { QuestionEditModel} from './editquestionModel';
import {AnswerEditModel } from './editAnswerModel';


@Injectable()  
export class EditQService {  
apiUrl: string = "https://www.api.cloudplace.org:4000/api/alreadyQuestion/";// Web API URL 
apiUrl1: string = "https://www.api.cloudplace.org:4000/api/alreadyAnswers/"; 
apiUrl2: string = "https://www.api.cloudplace.org:4000/api/questionUpdate/"; 
apiUrl3: string = "https://www.api.cloudplace.org:4000/api/AnswersUpdate/"; 

private static questionSet:any;

constructor(private _http: Http) { }  

 getQustions(pqh_id: any){
	 return this._http.get(this.apiUrl + pqh_id)
	 .map((res) =>res.json())
	 .catch((error:any) => Observable.throw(error.json().message || 'Server Error'));

 }

 getAnswers(pqq_id:any){
	return this._http.get(this.apiUrl1 + pqq_id)
	.map((res) =>res.json())
	.catch((error:any) => Observable.throw(error.json().message || 'That Question Has no Answers'));

 }

 updateQuestion(editedQuestion: QuestionEditModel){
	  return this._http.post(this.apiUrl2, editedQuestion);
	//  .map((res)=> res.json())
	//  .catch((error: any) => Observable.throw(error.error.message || 'Server error'));  

 }
 updateAnswers(answersEditModel: AnswerEditModel){
		   return this._http.post(this.apiUrl3 , answersEditModel);
		  //  .map((res)=> res.json())
		//	.catch((error: any) => Observable.throw(error.error.message || 'Server error'));  

 }

 getQuiz():any{
	// console.log('this.quizSummary2',localStorage.getItem('QuizsummaryService.quizSummary'));
	 return   JSON.parse(localStorage.getItem('PoliciesService.questionSet'));
	}

 setQuiz(quiz:any){

	EditQService.questionSet=quiz;
	// console.log('this.quizSummary',QuizsummaryService.quizSummary);
	 localStorage.setItem('PoliciesService.questionSet',JSON.stringify(quiz));
	 
  
 }


}
