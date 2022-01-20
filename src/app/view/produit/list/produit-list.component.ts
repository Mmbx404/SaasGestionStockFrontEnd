import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../controller/service/Produit.service';
import {ProduitVo} from '../../../controller/model/Produit.model';
import * as moment from 'moment';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RoleService} from 'src/app/controller/service/role.service';
import {AuthService} from "../../../controller/service/Auth.service";

@Component({
    selector: 'app-produit-list',
    templateUrl: './produit-list.component.html',
    styleUrls: ['./produit-list.component.css']
})

export class ProduitListComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    searchProduitMin: Date = null;
    searchProduitMax: Date = null;

    constructor(private produitService: ProduitService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private authService: AuthService) {
    }

    get produits(): Array<ProduitVo> {
        return this.produitService.produits;
    }

    set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
    }

    get produitSelections(): Array<ProduitVo> {
        return this.produitService.produitSelections;
    }

    set produitSelections(value: Array<ProduitVo>) {
        this.produitService.produitSelections = value;
    }

    get selectedProduit(): ProduitVo {
        return this.produitService.selectedProduit;
    }

    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
    }

    get createProduitDialog(): boolean {
        return this.produitService.createProduitDialog;
    }

    set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog = value;
    }


    // getters and setters

    get editProduitDialog(): boolean {
        return this.produitService.editProduitDialog;
    }

    set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog = value;
    }

    get viewProduitDialog(): boolean {
        return this.produitService.viewProduitDialog;
    }

    set viewProduitDialog(value: boolean) {
        this.produitService.viewProduitDialog = value;
    }

    get searchProduit(): ProduitVo {
        return this.produitService.searchProduit;
    }

    set searchProduit(value: ProduitVo) {
        this.produitService.searchProduit = value;
    }

    ngOnInit(): void {
        this.loadProduits();
    }

    // methods
    public async loadProduits() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted("Produit", "list");
        if (isPermistted) {
            console.log('is permited is true and the user name is ', this.authService.authenticatedUser.username);
            if (this.authService.authenticatedUser.username !== 'admin') {
                this.produitService.findByUserName().subscribe(produits => this.produits = produits, error => console.log(error))
            } else {
                this.produitService.findAll().subscribe(produits => this.produits = produits, error => console.log(error))
            }
        } else {
            this.messageService.add({severity: 'error', summary: "", detail: "you don't have enough permissions"});
        }
    }

    public searchRequest() {
        this.searchProduit.dateAjoutMax = this.searchProduitMax ? moment(this.searchProduitMax).format("YYYY-MM-DD") : '';
        this.searchProduit.dateAjoutMin = this.searchProduitMin ? moment(this.searchProduitMin).format("YYYY-MM-DD") : '';
        this.produitService.findByCriteria(this.searchProduit).subscribe(produits => {

            this.produits = produits;
            // this.searchProduit = new ProduitVo();
        }, error => console.log(error));
    }

    public async editProduit(produit: ProduitVo) {
        const isPermistted = await this.roleService.isPermitted("Produit", "edit");
        if (isPermistted) {
            this.selectedProduit = produit;
            this.editProduitDialog = true;
            this.produitService.editProduit$.next(true);
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async viewProduit(produit: ProduitVo) {
        const isPermistted = await this.roleService.isPermitted("Produit", "view");
        if (isPermistted) {
            this.selectedProduit = produit;
            this.viewProduitDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async openCreateProduit(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, "add");
        if (isPermistted) {
            this.selectedProduit = new ProduitVo();
            this.createProduitDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: "", detail: "you don't have enough permissions"
            });
        }

    }

    public async deleteProduit(produit: ProduitVo) {
        const isPermistted = await this.roleService.isPermitted("Produit", "delete");
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete the Produit ?',
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.produitService.delete(produit).subscribe(status => {
                        if (status > 0) {
                            const position = this.produits.indexOf(produit);
                            position > -1 ? this.produits.splice(position, 1) : false;
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Produit Deleted',
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
            {field: 'prix', header: 'prix'},
            {field: 'qteStock', header: 'qteStock'},
            {field: 'dateAjout', header: 'dateAjout'},
            {field: 'prixUnitaire', header: 'prixUnitaire'},
            {field: 'compte', header: 'compte'},
        ];
    }


}
