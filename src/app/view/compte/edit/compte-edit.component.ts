import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {CompteService} from '../../../controller/service/Compte.service';
import {CompteVo} from '../../../controller/model/Compte.model';

@Component({
    selector: 'app-compte-edit',
    templateUrl: './compte-edit.component.html',
    styleUrls: ['./compte-edit.component.css']
})
export class CompteEditComponent implements OnInit {
// declarations
    editCompteForm = new FormGroup({
        reference: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required]),
        mdp: new FormControl("", [Validators.required]),
        dateCreation: new FormControl(new Date(), [Validators.required]),
    });

    constructor(private compteService: CompteService) {
    }

// methods

// getters and setters
    get reference() {
        return this.editCompteForm.get('reference');
    }

    get email() {
        return this.editCompteForm.get('email');
    }

    get mdp() {
        return this.editCompteForm.get('mdp');
    }

    get dateCreation() {
        return this.editCompteForm.get('dateCreation');
    }

    get comptes(): Array<CompteVo> {
        return this.compteService.comptes;
    }

    set comptes(value: Array<CompteVo>) {
        this.compteService.comptes = value;
    }

    get selectedCompte(): CompteVo {
        return this.compteService.selectedCompte;
    }

    set selectedCompte(value: CompteVo) {
        this.compteService.selectedCompte = value;
    }

    get editCompteDialog(): boolean {
        return this.compteService.editCompteDialog;
    }

    set editCompteDialog(value: boolean) {
        this.compteService.editCompteDialog = value;
    }

    ngOnInit(): void {
        this.compteService.editCompte$.subscribe(value => {
            if (value) {
                this.editCompteForm.setValue({
                    reference: this.selectedCompte.reference,
                    email: this.selectedCompte.email,
                    mdp: this.selectedCompte.mdp,
                    dateCreation: moment(this.selectedCompte.dateCreation).toDate(),
                });
            }
        });
    }

    public edit() {
        this.compteService.edit().subscribe(updatedCompte => {
            const indexOfUpdated = this.comptes.findIndex(
                (Compte) => Compte.id === updatedCompte.id
            );
            indexOfUpdated > -1 ? this.comptes[indexOfUpdated] = updatedCompte : false;
        });
        this.editCompteDialog = false;
        this.selectedCompte = new CompteVo();
    }

    hideEditDialog() {
        this.editCompteDialog = false;
    }

    submit() {
        this.selectedCompte.reference = this.reference.value;
        this.selectedCompte.email = this.email.value;
        this.selectedCompte.mdp = this.mdp.value;
        this.selectedCompte.dateCreation = moment(this.dateCreation.value).format("YYYY-MM-DD");
        this.compteService.edit().subscribe(result => {
            this.editCompteDialog = false;
        }, error => {
            console.log(error);
        });

    }


}
