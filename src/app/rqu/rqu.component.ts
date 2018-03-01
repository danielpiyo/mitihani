import { Component, OnInit } from '@angular/core';
import { Quote } from '../quotsummary/quote';
import { QuotsummaryService } from '../quotsummary/quotsummary.service'; 
import { AlertService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'rqu.component.html'
})

export class RquComponent implements OnInit {
    private bodyText: string;
    quoteSummary : Quote;
    model : any;

    constructor(
        private quotsummaryService : QuotsummaryService,
        private modalService: AlertService)
    {
        this.quoteSummary = JSON.parse(localStorage.getItem('quoteSummary'));
    }

    ngOnInit() {
       this.model.dcon_no = this.quoteSummary.control_no;

    }

  
}