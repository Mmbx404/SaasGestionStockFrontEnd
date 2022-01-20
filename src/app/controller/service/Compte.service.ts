import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {CompteVo} from '../model/Compte.model';


@Injectable({
    providedIn: 'root'
})
export class CompteService {
    public editCompte$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = 'http://localhost:8036/api/' + role + '/compte/';
        })
    }

    private _comptes: Array<CompteVo> = [];

    get comptes(): Array<CompteVo> {
        return this._comptes == null ? this._comptes = new Array<CompteVo>() : this._comptes;
    }

    set comptes(value: Array<CompteVo>) {
        this._comptes = value;
    }

    private _selectedCompte: CompteVo = new CompteVo();

    get selectedCompte(): CompteVo {
        return this._selectedCompte;
    }

    set selectedCompte(value: CompteVo) {
        this._selectedCompte = value;
    }

    private _compteSelections: Array<CompteVo>;


    // getters and setters

    get compteSelections(): Array<CompteVo> {
        return this._compteSelections;
    }

    set compteSelections(value: Array<CompteVo>) {
        this._compteSelections = value;
    }

    private _createCompteDialog: boolean;

    get createCompteDialog(): boolean {
        return this._createCompteDialog;
    }

    set createCompteDialog(value: boolean) {
        this._createCompteDialog = value;
    }

    private _editCompteDialog: boolean;

    get editCompteDialog(): boolean {
        return this._editCompteDialog;
    }

    set editCompteDialog(value: boolean) {
        this._editCompteDialog = value;
    }

    private _viewCompteDialog: boolean;

    get viewCompteDialog(): boolean {
        return this._viewCompteDialog;
    }

    set viewCompteDialog(value: boolean) {
        this._viewCompteDialog = value;
    }

    private _searchCompte: CompteVo = new CompteVo();

    get searchCompte(): CompteVo {
        return this._searchCompte;
    }

    set searchCompte(value: CompteVo) {
        this._searchCompte = value;
    }

    // methods

    public findAll() {
        return this.http.get<Array<CompteVo>>(this.API);
    }

    public save(): Observable<CompteVo> {
        return this.http.post<CompteVo>(this.API, {
            ...this.selectedCompte,
            dateCreation: moment(this.selectedCompte.dateCreation).format("YYYY-MM-DD")
        });
    }

    delete(compte: CompteVo) {
        return this.http.delete<number>(this.API + "id/" + compte.id);
    }


    public edit(): Observable<CompteVo> {
        return this.http.put<CompteVo>(this.API, this.selectedCompte);
    }


    public findByCriteria(compte: CompteVo): Observable<Array<CompteVo>> {
        return this.http.post<Array<CompteVo>>(this.API + "search", compte);
    }


}
