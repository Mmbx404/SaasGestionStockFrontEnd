import {User} from "./User.model";

export class ProduitVo {
    public id: number;
    public reference: string;
    public prix: number;
    public qteStock: number;
    public dateAjout: string;
    public prixUnitaire: number;
    public prixMax: string;
    public prixMin: string;
    public qteStockMax: string;
    public qteStockMin: string;
    public dateAjoutMax: string;
    public dateAjoutMin: string;
    public prixUnitaireMax: string;
    public prixUnitaireMin: string;
    public user: User = new User();


}
