
import { Component } from '@angular/core';
import { ClassLevelService } from './classLevel.service';
import { UserService } from '../_services/index';
//import { IalertService } from './ialert.service';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { Products } from './products';
import { Observable } from 'rxjs/Observable';
//import { PaginatorModule } from 'primeng/paginator';
//import {DataTableModule} from 'primeng/datatable';
import { HeaderModel } from './subjectModel';
import { QuestionService } from '../question/question.service';
import { EditQService} from '../editquestion/editQ.service';



@Component({
    moduleId: module.id.toString(),
    selector: 'classLevel.component',
    templateUrl: 'classLevel.component.html',
    providers: [ClassLevelService]
})

export class ClassLevelComponent {
    quickHeader: HeaderModel = new HeaderModel();
  
    selectedProduct: Products = new Products();
    classLevels = [];
    allBrand = [];
    classSelected: string;
    classDetails = [];
    allSubjects = [];
    selectedSubject = {}
    pqqId: Number;
    mode = 'normal'
    model: any;
    //currentStarted : StartedPQH;
    currentStarted : any;
   // loading = false;
    currentUser: User;
    users: User[] = [];
    //   paginate(event) {}
    constructor(
        private router: Router,
        private _editquestionService: EditQService,
        private _questionService: QuestionService,
        private _classLevelService: ClassLevelService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.quickHeader.created_by = this.currentUser.surname;
        this.quickHeader.prepared_by = this.currentUser.surname;
        this.quickHeader.entity_sys_id = this.currentUser.entity_sys_id;

        //this.currentStarted = JSON.parse(localStorage.getItem('startSetting'));
    }

    ngOnInit() {
        // this.loadAllUsers();  
        this.getBrand();
        this.getClassLevels();

    }

    getClassLevels() {
        this._classLevelService.getClassLevel()
            .subscribe((res) => {
                this.classLevels = res;
                console.log('classLevel', this.classLevels);
            },
                error => {
                    alert(error);
                    console.log(error.message);
                }
            );
    };

    goToClassDetailsPage(code_id: any) {
        console.log('SelectedCode', code_id);
        this._classLevelService.getClassDetails(code_id)
            .subscribe((res) => {
                this.classDetails = res;
                console.log('ClassDetails', this.classDetails);
            },
                (error) => {
                    alert(error.message);
                    this.router.navigate(['/set']);
                });
    }

    goToSubjectPage(code: any) {
        this.classSelected = code;
        this.quickHeader.class_level_code = this.classSelected
        this._classLevelService.getSubjects(code)
            .subscribe((res) => {
                this.allSubjects = res;
                console.log('AllSubjects', this.allSubjects);
                this.mode = 'start';
            },
        (error)=>{
            alert(error.message);
            this.mode = 'normal';
        })
        

    }

    onSelect(subject: any) {
        this.selectedSubject = subject;
        console.log('Subject', subject);
    }

    getBrand(){
      this._classLevelService.getBrand()
      .subscribe((response)=>{
             this.allBrand = response
             console.log('AllBrand', this.allBrand);
      })
    }

    submit() { 
                console.log('Model', this.quickHeader);
                this._classLevelService.header(this.quickHeader)
                .subscribe((response)=>{
                    let res;
                    res = response.user;
                    console.log('Res', res);
                    console.log('REsponse', response.user);
                   this._questionService.setQuiz(res);
                   this._editquestionService.setQuiz(res);
                   alert('Hello ' +  this.currentUser.surname + ' ' + 'click the set Quiz button after adding all questions and answers for this' + ' ' + this.selectedSubject + ' quiz');
                   this.router.navigate(['/quiz']);
                 
                },
            (error)=>{
                alert(error.message);
                
            }); 
        //this.mode = 'question';
    }

    
}

