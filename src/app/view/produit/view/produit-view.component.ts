import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../controller/service/Produit.service';
import {ProduitVo} from '../../../controller/model/Produit.model';

@Component({
    selector: 'app-produit-view',
    templateUrl: './produit-view.component.html',
    styleUrls: ['./produit-view.component.css']
})
export class ProduitViewComponent implements OnInit {

    constructor(private produitService: ProduitService) {
    }

    // getters and setters
    get viewProduitDialog(): boolean {
        return this.produitService.viewProduitDialog;
    }

    set viewProduitDialog(value: boolean) {
        this.produitService.viewProduitDialog = value;
    }

    get selectedProduit(): ProduitVo {
        return this.produitService.selectedProduit;
    }

    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
    }

    ngOnInit(): void {
    }

    // methods
    public hideViewDialog() {
        this.viewProduitDialog = false;
    }


}
