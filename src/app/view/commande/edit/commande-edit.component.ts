import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {CommandeService} from '../../../controller/service/Commande.service';
import {CommandeVo} from '../../../controller/model/Commande.model';

@Component({
    selector: 'app-commande-edit',
    templateUrl: './commande-edit.component.html',
    styleUrls: ['./commande-edit.component.css']
})
export class CommandeEditComponent implements OnInit {
// declarations
    editCommandeForm = new FormGroup({
        reference: new FormControl("", [Validators.required]),
        prixTotal: new FormControl(0, [Validators.required]),
        dateCreation: new FormControl(new Date(), [Validators.required]),
    });

    constructor(private commandeService: CommandeService) {
    }

// methods

// getters and setters
    get reference() {
        return this.editCommandeForm.get('reference');
    }

    get prixTotal() {
        return this.editCommandeForm.get('prixTotal');
    }

    get dateCreation() {
        return this.editCommandeForm.get('dateCreation');
    }

    get commandes(): Array<CommandeVo> {
        return this.commandeService.commandes;
    }

    set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
    }

    get selectedCommande(): CommandeVo {
        return this.commandeService.selectedCommande;
    }

    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
    }

    get editCommandeDialog(): boolean {
        return this.commandeService.editCommandeDialog;
    }

    set editCommandeDialog(value: boolean) {
        this.commandeService.editCommandeDialog = value;
    }

    ngOnInit(): void {
        this.commandeService.editCommande$.subscribe(value => {
            if (value) {
                this.editCommandeForm.setValue({
                    reference: this.selectedCommande.reference,
                    prixTotal: this.selectedCommande.prixTotal,
                    dateCreation: moment(this.selectedCommande.dateCreation).toDate(),
                });
            }
        });
    }

    public edit() {
        this.commandeService.edit().subscribe(updatedCommande => {
            const indexOfUpdated = this.commandes.findIndex(
                (Commande) => Commande.id === updatedCommande.id
            );
            indexOfUpdated > -1 ? this.commandes[indexOfUpdated] = updatedCommande : false;
        });
        this.editCommandeDialog = false;
        this.selectedCommande = new CommandeVo();
    }

    hideEditDialog() {
        this.editCommandeDialog = false;
    }

    submit() {
        this.selectedCommande.reference = this.reference.value;
        this.selectedCommande.prixTotal = this.prixTotal.value;
        this.selectedCommande.dateCreation = moment(this.dateCreation.value).format("YYYY-MM-DD");
        this.commandeService.edit().subscribe(result => {
            this.editCommandeDialog = false;
        }, error => {
            console.log(error);
        });

    }


}
