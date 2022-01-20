import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../../controller/service/Commande.service';
import {CommandeVo} from '../../../controller/model/Commande.model';

@Component({
    selector: 'app-commande-create',
    templateUrl: './commande-create.component.html',
    styleUrls: ['./commande-create.component.css']
})
export class CommandeCreateComponent implements OnInit {

    constructor(private commandeService: CommandeService
    ) {
    }

    get commandes(): Array<CommandeVo> {
        return this.commandeService.commandes;
    }

    set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
    }

// methods

    get selectedCommande(): CommandeVo {
        return this.commandeService.selectedCommande;
    }

// getters and setters

    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
    }

    get createCommandeDialog(): boolean {
        return this.commandeService.createCommandeDialog;
    }

    set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog = value;
    }

// methods
    ngOnInit(): void {
    }

    public save() {
        this.commandeService.save().subscribe(commande => {

            this.commandes.push({...commande});
            this.createCommandeDialog = false;
            this.selectedCommande = new CommandeVo();
        }, error => {
            console.log(error);
        })
    }

    hideCreateDialog() {
        this.createCommandeDialog = false;
    }


}
