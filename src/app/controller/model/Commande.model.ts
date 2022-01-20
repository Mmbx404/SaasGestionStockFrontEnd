import {User} from "./User.model";

export class CommandeVo {
    public id: number;
    public reference: string;
    public prixTotal: number;
    public dateCreation: string;
    public prixTotalMax: string;
    public prixTotalMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public user: User = new User();


}
