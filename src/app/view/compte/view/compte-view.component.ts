import {Component, OnInit} from '@angular/core';
import {CompteService} from '../../../controller/service/Compte.service';
import {CompteVo} from '../../../controller/model/Compte.model';

@Component({
    selector: 'app-compte-view',
    templateUrl: './compte-view.component.html',
    styleUrls: ['./compte-view.component.css']
})
export class CompteViewComponent implements OnInit {

    constructor(private compteService: CompteService) {
    }

    // getters and setters
    get viewCompteDialog(): boolean {
        return this.compteService.viewCompteDialog;
    }

    set viewCompteDialog(value: boolean) {
        this.compteService.viewCompteDialog = value;
    }

    get selectedCompte(): CompteVo {
        return this.compteService.selectedCompte;
    }

    set selectedCompte(value: CompteVo) {
        this.compteService.selectedCompte = value;
    }

    ngOnInit(): void {
    }

    // methods
    public hideViewDialog() {
        this.viewCompteDialog = false;
    }


}
