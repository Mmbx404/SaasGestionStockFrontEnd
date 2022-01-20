import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../../controller/service/Commande.service';
import {CommandeVo} from '../../../controller/model/Commande.model';

@Component({
    selector: 'app-commande-view',
    templateUrl: './commande-view.component.html',
    styleUrls: ['./commande-view.component.css']
})
export class CommandeViewComponent implements OnInit {

    constructor(private commandeService: CommandeService) {
    }

    // getters and setters
    get viewCommandeDialog(): boolean {
        return this.commandeService.viewCommandeDialog;
    }

    set viewCommandeDialog(value: boolean) {
        this.commandeService.viewCommandeDialog = value;
    }

    get selectedCommande(): CommandeVo {
        return this.commandeService.selectedCommande;
    }

    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
    }

    ngOnInit(): void {
    }

    // methods
    public hideViewDialog() {
        this.viewCommandeDialog = false;
    }


}
