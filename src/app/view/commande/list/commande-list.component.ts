import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../../controller/service/Commande.service';
import {CommandeVo} from '../../../controller/model/Commande.model';
import * as moment from 'moment';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RoleService} from 'src/app/controller/service/role.service';
import {AuthService} from "../../../controller/service/Auth.service";

@Component({
    selector: 'app-commande-list',
    templateUrl: './commande-list.component.html',
    styleUrls: ['./commande-list.component.css']
})

export class CommandeListComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    searchCommandeMin: Date = null;
    searchCommandeMax: Date = null;

    constructor(private commandeService: CommandeService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private authService: AuthService) {
    }

    get commandes(): Array<CommandeVo> {
        return this.commandeService.commandes;
    }

    set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
    }

    get commandeSelections(): Array<CommandeVo> {
        return this.commandeService.commandeSelections;
    }

    set commandeSelections(value: Array<CommandeVo>) {
        this.commandeService.commandeSelections = value;
    }

    get selectedCommande(): CommandeVo {
        return this.commandeService.selectedCommande;
    }

    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
    }

    get createCommandeDialog(): boolean {
        return this.commandeService.createCommandeDialog;
    }

    set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog = value;
    }


    // getters and setters

    get editCommandeDialog(): boolean {
        return this.commandeService.editCommandeDialog;
    }

    set editCommandeDialog(value: boolean) {
        this.commandeService.editCommandeDialog = value;
    }

    get viewCommandeDialog(): boolean {
        return this.commandeService.viewCommandeDialog;
    }

    set viewCommandeDialog(value: boolean) {
        this.commandeService.viewCommandeDialog = value;
    }

    get searchCommande(): CommandeVo {
        return this.commandeService.searchCommande;
    }

    set searchCommande(value: CommandeVo) {
        this.commandeService.searchCommande = value;
    }

    ngOnInit(): void {
        this.loadCommandes();
    }

    // methods
    public async loadCommandes() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted("Commande", "list");
        if (isPermistted) {
            if (this.authService.authenticatedUser.username !== 'admin') {
                this.commandeService.findByUserName().subscribe(commandes => this.commandes = commandes, error => console.log(error));
            } else {
                this.commandeService.findAll().subscribe(commandes => this.commandes = commandes, error => console.log(error));
            }
        } else {
            this.messageService.add({severity: 'error', summary: "", detail: "you don't have enough permissions"});
        }
    }

    public searchRequest() {
        this.searchCommande.dateCreationMax = this.searchCommandeMax ? moment(this.searchCommandeMax).format("YYYY-MM-DD") : '';
        this.searchCommande.dateCreationMin = this.searchCommandeMin ? moment(this.searchCommandeMin).format("YYYY-MM-DD") : '';
        this.commandeService.findByCriteria(this.searchCommande).subscribe(commandes => {

            this.commandes = commandes;
            // this.searchCommande = new CommandeVo();
        }, error => console.log(error));
    }

    public async editCommande(commande: CommandeVo) {
        const isPermistted = await this.roleService.isPermitted("Commande", "edit");
        if (isPermistted) {
            this.selectedCommande = commande;
            this.editCommandeDialog = true;
            this.commandeService.editCommande$.next(true);
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async viewCommande(commande: CommandeVo) {
        const isPermistted = await this.roleService.isPermitted("Commande", "view");
        if (isPermistted) {
            this.selectedCommande = commande;
            this.viewCommandeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async openCreateCommande(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, "add");
        if (isPermistted) {
            this.selectedCommande = new CommandeVo();
            this.createCommandeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async deleteCommande(commande: CommandeVo) {
        const isPermistted = await this.roleService.isPermitted("Commande", "delete");
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete the Commande ?',
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.commandeService.delete(commande).subscribe(status => {
                        if (status > 0) {
                            const position = this.commandes.indexOf(commande);
                            position > -1 ? this.commandes.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Commande Deleted',
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
            {field: 'prixTotal', header: 'prixTotal'},
            {field: 'dateCreation', header: 'dateCreation'},
            {field: 'compte', header: 'compte'},
        ];
    }


}
