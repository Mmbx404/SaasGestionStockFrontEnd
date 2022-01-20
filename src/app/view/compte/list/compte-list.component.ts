import {Component, OnInit} from '@angular/core';
import {CompteService} from '../../../controller/service/Compte.service';
import {CompteVo} from '../../../controller/model/Compte.model';
import * as moment from 'moment';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RoleService} from 'src/app/controller/service/role.service';

@Component({
    selector: 'app-compte-list',
    templateUrl: './compte-list.component.html',
    styleUrls: ['./compte-list.component.css']
})

export class CompteListComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    searchCompteMin: Date = null;
    searchCompteMax: Date = null;

    constructor(private compteService: CompteService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService) {
    }

    get comptes(): Array<CompteVo> {
        return this.compteService.comptes;
    }

    set comptes(value: Array<CompteVo>) {
        this.compteService.comptes = value;
    }

    get compteSelections(): Array<CompteVo> {
        return this.compteService.compteSelections;
    }

    set compteSelections(value: Array<CompteVo>) {
        this.compteService.compteSelections = value;
    }

    get selectedCompte(): CompteVo {
        return this.compteService.selectedCompte;
    }

    set selectedCompte(value: CompteVo) {
        this.compteService.selectedCompte = value;
    }

    get createCompteDialog(): boolean {
        return this.compteService.createCompteDialog;
    }

    set createCompteDialog(value: boolean) {
        this.compteService.createCompteDialog = value;
    }


    // getters and setters

    get editCompteDialog(): boolean {
        return this.compteService.editCompteDialog;
    }

    set editCompteDialog(value: boolean) {
        this.compteService.editCompteDialog = value;
    }

    get viewCompteDialog(): boolean {
        return this.compteService.viewCompteDialog;
    }

    set viewCompteDialog(value: boolean) {
        this.compteService.viewCompteDialog = value;
    }

    get searchCompte(): CompteVo {
        return this.compteService.searchCompte;
    }

    set searchCompte(value: CompteVo) {
        this.compteService.searchCompte = value;
    }

    ngOnInit(): void {
        this.loadComptes();
    }

    // methods
    public async loadComptes() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted("Compte", "list");
        isPermistted ? this.compteService.findAll().subscribe(comptes => this.comptes = comptes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: "", detail: "you don't have enough permissions"});
    }

    public searchRequest() {
        this.searchCompte.dateCreationMax = this.searchCompteMax ? moment(this.searchCompteMax).format("YYYY-MM-DD") : '';
        this.searchCompte.dateCreationMin = this.searchCompteMin ? moment(this.searchCompteMin).format("YYYY-MM-DD") : '';
        this.compteService.findByCriteria(this.searchCompte).subscribe(comptes => {

            this.comptes = comptes;
            // this.searchCompte = new CompteVo();
        }, error => console.log(error));
    }

    public async editCompte(compte: CompteVo) {
        const isPermistted = await this.roleService.isPermitted("Compte", "edit");
        if (isPermistted) {
            this.selectedCompte = compte;
            this.editCompteDialog = true;
            this.compteService.editCompte$.next(true);
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async viewCompte(compte: CompteVo) {
        const isPermistted = await this.roleService.isPermitted("Compte", "view");
        if (isPermistted) {
            this.selectedCompte = compte;
            this.viewCompteDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async openCreateCompte(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, "add");
        if (isPermistted) {
            this.selectedCompte = new CompteVo();
            this.createCompteDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async deleteCompte(compte: CompteVo) {
        const isPermistted = await this.roleService.isPermitted("Compte", "delete");
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete the Compte ?',
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.compteService.delete(compte).subscribe(status => {
                        if (status > 0) {
                            const position = this.comptes.indexOf(compte);
                            position > -1 ? this.comptes.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Compte Deleted',
                            life: 3000
                        });
                    }, error => console.log(error))
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }


    }

    private initCol() {
        this.cols = [
            {field: 'id', header: 'id'},
            {field: 'reference', header: 'reference'},
            {field: 'email', header: 'email'},
            {field: 'mdp', header: 'mdp'},
            {field: 'dateCreation', header: 'dateCreation'},
            {field: 'produits', header: 'produits'},
        ];
    }


}
