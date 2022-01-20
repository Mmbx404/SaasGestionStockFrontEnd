import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../controller/service/Produit.service';
import {ProduitVo} from '../../../controller/model/Produit.model';

@Component({
    selector: 'app-produit-create',
    templateUrl: './produit-create.component.html',
    styleUrls: ['./produit-create.component.css']
})
export class ProduitCreateComponent implements OnInit {

    constructor(private produitService: ProduitService
    ) {
    }

    get produits(): Array<ProduitVo> {
        return this.produitService.produits;
    }

    set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
    }

// methods

    get selectedProduit(): ProduitVo {
        return this.produitService.selectedProduit;
    }

// getters and setters

    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
    }

    get createProduitDialog(): boolean {
        return this.produitService.createProduitDialog;
    }

    set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog = value;
    }

// methods
    ngOnInit(): void {
    }

    public save() {
        this.produitService.save().subscribe(produit => {

            this.produits.push({...produit});
            this.createProduitDialog = false;
            this.selectedProduit = new ProduitVo();
        }, error => {
            console.log(error);
        })
    }

    hideCreateDialog() {
        this.createProduitDialog = false;
    }


}
