import { Injectable } from '@angular/core';  
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http'; 
import { HttpParams, HttpClient } from '@angular/common/http';
import {  SetModel} from '../incomplete/setModel';;  
import { Observable } from 'rxjs/Observable';  
import {  Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import 'rxjs/add/operator/catch';
import { QuestionModel} from './questionModel';
import { AnswerModel} from './answerModel';

@Injectable()  
export class QuestionService {  
	apiUrl: string = "https://www.api.cloudplace.org:4000/api/setQuestion/"; //posting to Question
    apiUrl1: string = "https://www.api.cloudplace.org:4000/api/setAnswer/"; //posting to Question
	apiUrl2: string = "https://www.api.cloudplace.org:4000/api/QuestionSet/";// Web API URL
	private static questionSet:any;

constructor(private _http: Http) { }  

 
questioSet(questionModel: QuestionModel){
	return this._http.post(this.apiUrl , questionModel)
	.map((res)=> res.json())
	.catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
}

answerSet(answerModel:AnswerModel){
	  return this._http.post(this.apiUrl1, answerModel);
	 // .map((res) => res.json())
	//  .catch((error:any) => Observable.throw(error.json).error ||'Server Error');
}


getQuiz():any{
	// console.log('this.quizSummary2',localStorage.getItem('QuizsummaryService.quizSummary'));
	 return   JSON.parse(localStorage.getItem('QuestionService.questionSet'));
	}

 setQuiz(quiz:any){

	QuestionService.questionSet=quiz;
	// console.log('this.quizSummary',QuizsummaryService.quizSummary);
	 localStorage.setItem('QuestionService.questionSet',JSON.stringify(quiz));
	
 }

 finalSetQuiz(quickSet: SetModel){
	 return this._http.post(this.apiUrl2 , quickSet)
	// .map((res)=>res.json())
	// .catch((error:any)=>Observable.throw(error.json() || 'Server Error'));

 }

}
