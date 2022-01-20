import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {ProduitService} from '../../../controller/service/Produit.service';
import {ProduitVo} from '../../../controller/model/Produit.model';

@Component({
    selector: 'app-produit-edit',
    templateUrl: './produit-edit.component.html',
    styleUrls: ['./produit-edit.component.css']
})
export class ProduitEditComponent implements OnInit {
// declarations
    editProduitForm = new FormGroup({
        reference: new FormControl("", [Validators.required]),
        prix: new FormControl(0, [Validators.required]),
        qteStock: new FormControl(0, [Validators.required]),
        dateAjout: new FormControl(new Date(), [Validators.required]),
        prixUnitaire: new FormControl(0, [Validators.required]),
    });

    constructor(private produitService: ProduitService) {
    }

// methods

// getters and setters
    get reference() {
        return this.editProduitForm.get('reference');
    }

    get prix() {
        return this.editProduitForm.get('prix');
    }

    get qteStock() {
        return this.editProduitForm.get('qteStock');
    }

    get dateAjout() {
        return this.editProduitForm.get('dateAjout');
    }

    get prixUnitaire() {
        return this.editProduitForm.get('prixUnitaire');
    }

    get produits(): Array<ProduitVo> {
        return this.produitService.produits;
    }

    set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
    }

    get selectedProduit(): ProduitVo {
        return this.produitService.selectedProduit;
    }

    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
    }

    get editProduitDialog(): boolean {
        return this.produitService.editProduitDialog;
    }

    set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog = value;
    }

    ngOnInit(): void {
        this.produitService.editProduit$.subscribe(value => {
            if (value) {
                this.editProduitForm.setValue({
                    reference: this.selectedProduit.reference,
                    prix: this.selectedProduit.prix,
                    qteStock: this.selectedProduit.qteStock,
                    dateAjout: moment(this.selectedProduit.dateAjout).toDate(),
                    prixUnitaire: this.selectedProduit.prixUnitaire,
                });
            }
        });
    }

    public edit() {
        this.produitService.edit().subscribe(updatedProduit => {
            const indexOfUpdated = this.produits.findIndex(
                (Produit) => Produit.id === updatedProduit.id
            );
            indexOfUpdated > -1 ? this.produits[indexOfUpdated] = updatedProduit : false;
        });
        this.editProduitDialog = false;
        this.selectedProduit = new ProduitVo();
    }

    hideEditDialog() {
        this.editProduitDialog = false;
    }

    submit() {
        this.selectedProduit.reference = this.reference.value;
        this.selectedProduit.prix = this.prix.value;
        this.selectedProduit.qteStock = this.qteStock.value;
        this.selectedProduit.dateAjout = moment(this.dateAjout.value).format("YYYY-MM-DD");
        this.selectedProduit.prixUnitaire = this.prixUnitaire.value;
        this.produitService.edit().subscribe(result => {
            this.editProduitDialog = false;
        }, error => {
            console.log(error);
        });

    }


}
