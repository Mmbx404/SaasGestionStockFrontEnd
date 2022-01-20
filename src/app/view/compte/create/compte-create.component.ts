import {Component, OnInit} from '@angular/core';
import {CompteService} from '../../../controller/service/Compte.service';
import {CompteVo} from '../../../controller/model/Compte.model';
import {ProduitVo} from '../../../controller/model/Produit.model';

@Component({
    selector: 'app-compte-create',
    templateUrl: './compte-create.component.html',
    styleUrls: ['./compte-create.component.css']
})
export class CompteCreateComponent implements OnInit {

    selectedProduit: ProduitVo = new ProduitVo();
    produitListe: Array<ProduitVo> = [];

    constructor(private compteService: CompteService
    ) {
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

// methods

    get createCompteDialog(): boolean {
        return this.compteService.createCompteDialog;
    }

// getters and setters

    set createCompteDialog(value: boolean) {
        this.compteService.createCompteDialog = value;
    }

// methods
    ngOnInit(): void {
    }

    addProduit() {
        this.produitListe.push(this.selectedProduit);
        this.selectedProduit = new ProduitVo();
    }

    deleteProduit(p: ProduitVo) {
        this.produitListe.forEach((element, index) => {
            if (element === p) {
                this.produitListe.splice(index, 1);
            }
        });
    }

    public save() {
        this.compteService.save().subscribe(compte => {

            this.comptes.push({...compte});
            this.createCompteDialog = false;
            this.selectedCompte = new CompteVo();
        }, error => {
            console.log(error);
        });
        this.selectedProduit = new ProduitVo();
        this.produitListe = [];
    }

    hideCreateDialog() {
        this.createCompteDialog = false;
    }


}
