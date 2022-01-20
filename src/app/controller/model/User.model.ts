import {Role} from "./Role.model";

export class User {
    public credentialsNonExpired: boolean;
    public enabled: boolean;
    public email: string;
    public accountNonExpired: boolean;
    public accountNonLocked: boolean;
    public id: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public passwordChanged: boolean;
    public newPassword: string;
    public confirmPassword: string;
    public createdAt: Date;
    public updatedAt: Date;
    public roles: Array<Role> = [new Role()];
}
