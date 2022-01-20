import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {CommandeVo} from '../model/Commande.model';
import {AuthService} from "./Auth.service";


@Injectable({
    providedIn: 'root'
})
export class CommandeService {
    public editCommande$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService, private authService: AuthService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = 'http://localhost:8036/api/' + role + '/commande/';
        })
    }

    private _commandes: Array<CommandeVo> = [];

    get commandes(): Array<CommandeVo> {
        return this._commandes == null ? this._commandes = new Array<CommandeVo>() : this._commandes;
    }

    set commandes(value: Array<CommandeVo>) {
        this._commandes = value;
    }

    private _selectedCommande: CommandeVo = new CommandeVo();

    get selectedCommande(): CommandeVo {
        return this._selectedCommande;
    }

    set selectedCommande(value: CommandeVo) {
        this._selectedCommande = value;
    }

    private _commandeSelections: Array<CommandeVo>;


    // getters and setters

    get commandeSelections(): Array<CommandeVo> {
        return this._commandeSelections;
    }

    set commandeSelections(value: Array<CommandeVo>) {
        this._commandeSelections = value;
    }

    private _createCommandeDialog: boolean;

    get createCommandeDialog(): boolean {
        return this._createCommandeDialog;
    }

    set createCommandeDialog(value: boolean) {
        this._createCommandeDialog = value;
    }

    private _editCommandeDialog: boolean;

    get editCommandeDialog(): boolean {
        return this._editCommandeDialog;
    }

    set editCommandeDialog(value: boolean) {
        this._editCommandeDialog = value;
    }

    private _viewCommandeDialog: boolean;

    get viewCommandeDialog(): boolean {
        return this._viewCommandeDialog;
    }

    set viewCommandeDialog(value: boolean) {
        this._viewCommandeDialog = value;
    }

    private _searchCommande: CommandeVo = new CommandeVo();

    get searchCommande(): CommandeVo {
        return this._searchCommande;
    }

    set searchCommande(value: CommandeVo) {
        this._searchCommande = value;
    }

    // methods

    public findAll() {
        return this.http.get<Array<CommandeVo>>(this.API);
    }

    public findByUserName() {
        return this.http.get<Array<CommandeVo>>(this.API + 'compte/reference/' + this.authService.authenticatedUser.username);
    }

    public save(): Observable<CommandeVo> {
        this.selectedCommande.user = this.authService.authenticatedUser;
        this.selectedCommande.user.roles = null;
        return this.http.post<CommandeVo>(this.API, {
            ...this.selectedCommande,
            dateCreation: moment(this.selectedCommande.dateCreation).format("YYYY-MM-DD")
        });
    }

    delete(commande: CommandeVo) {
        return this.http.delete<number>(this.API + "id/" + commande.id);
    }


    public edit(): Observable<CommandeVo> {
        return this.http.put<CommandeVo>(this.API, this.selectedCommande);
    }


    public findByCriteria(commande: CommandeVo): Observable<Array<CommandeVo>> {
        return this.http.post<Array<CommandeVo>>(this.API + "search", commande);
    }


}
