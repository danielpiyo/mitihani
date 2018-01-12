import { Component, OnInit } from '@angular/core';

import { ModalService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'rqu.component.html'
})

export class RquComponent implements OnInit {
    private bodyText: string;

    constructor(private modalService: ModalService) {
    }

    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
    }

    openModal(id: string){
        this.modalService.open(id);
    }

    closeModal(id: string){
        this.modalService.close(id);
    }
}