import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {ProduitVo} from '../model/Produit.model';
import {AuthService} from "./Auth.service";


@Injectable({
    providedIn: 'root'
})
export class ProduitService {
    public editProduit$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService, private authService: AuthService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = 'http://localhost:8036/api/' + role + '/produit/';
        })
    }

    private _produits: Array<ProduitVo> = [];

    get produits(): Array<ProduitVo> {
        return this._produits == null ? this._produits = new Array<ProduitVo>() : this._produits;
    }

    set produits(value: Array<ProduitVo>) {
        this._produits = value;
    }

    private _selectedProduit: ProduitVo = new ProduitVo();

    get selectedProduit(): ProduitVo {
        return this._selectedProduit;
    }

    set selectedProduit(value: ProduitVo) {
        this._selectedProduit = value;
    }

    private _produitSelections: Array<ProduitVo>;


    // getters and setters

    get produitSelections(): Array<ProduitVo> {
        return this._produitSelections;
    }

    set produitSelections(value: Array<ProduitVo>) {
        this._produitSelections = value;
    }

    private _createProduitDialog: boolean;

    get createProduitDialog(): boolean {
        return this._createProduitDialog;
    }

    set createProduitDialog(value: boolean) {
        this._createProduitDialog = value;
    }

    private _editProduitDialog: boolean;

    get editProduitDialog(): boolean {
        return this._editProduitDialog;
    }

    set editProduitDialog(value: boolean) {
        this._editProduitDialog = value;
    }

    private _viewProduitDialog: boolean;

    get viewProduitDialog(): boolean {
        return this._viewProduitDialog;
    }

    set viewProduitDialog(value: boolean) {
        this._viewProduitDialog = value;
    }

    private _searchProduit: ProduitVo = new ProduitVo();

    get searchProduit(): ProduitVo {
        return this._searchProduit;
    }

    set searchProduit(value: ProduitVo) {
        this._searchProduit = value;
    }

    // methods

    public findAll() {
        return this.http.get<Array<ProduitVo>>(this.API);
    }

    public findByUserName() {
        return this.http.get<Array<ProduitVo>>(this.API + 'compte/reference/' + this.authService.authenticatedUser.username);
    }

    public save(): Observable<ProduitVo> {
        this.selectedProduit.user = this.authService.authenticatedUser;
        this.selectedProduit.user.roles = null;
        console.log('this is the product : ', this.selectedProduit);
        return this.http.post<ProduitVo>(this.API, {
            ...this.selectedProduit,
            dateAjout: moment(this.selectedProduit.dateAjout).format("YYYY-MM-DD")
        });
    }

    delete(produit: ProduitVo) {
        return this.http.delete<number>(this.API + "id/" + produit.id);
    }


    public edit(): Observable<ProduitVo> {
        return this.http.put<ProduitVo>(this.API, this.selectedProduit);
    }


    public findByCriteria(produit: ProduitVo): Observable<Array<ProduitVo>> {
        return this.http.post<Array<ProduitVo>>(this.API + "search", produit);
    }


}
