import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Role} from '../model/Role.model';
import {User} from '../model/User.model';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly API = 'http://localhost:8036';
    public _loggedIn = new BehaviorSubject<boolean>(false);
    public loggedIn$ = this._loggedIn.asObservable();
    public error: string = null;

    constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {
    }

    public _user = new User();

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    private _authenticatedUser = new User();

    get authenticatedUser(): User {
        return this._authenticatedUser;
    }

    set authenticatedUser(value: User) {
        this._authenticatedUser = value;
    }

    private _authenticated = <boolean>JSON.parse(localStorage.getItem('autenticated')) || false;

    get authenticated(): boolean {
        return this._authenticated;
    }

    set authenticated(value: boolean) {
        this._authenticated = value;
    }

    public login(username: string, password: string) {
        this.http.post<any>(this.API + "/login", {username, password}, {observe: 'response'}).subscribe(
            resp => {
                this.error = null;
                const jwt = resp.headers.get('Authorization');
                jwt != null ? this.tokenService.saveToken(jwt) : false;
                this.loadInfos(username);
                console.log("you're logged in successfully");
                this.router.navigate(['/app']);
            }, (error: HttpErrorResponse) => {
                this.error = error.error;
                console.log(error)
            }
        );
    }

    public loadInfos(usernamee: string = null) {
        const tokenDecoded = this.tokenService.decode();
        let username;
        if (usernamee == null) {
            username = tokenDecoded.sub;
        }
        if (usernamee != null) {
            username = usernamee
        }
        const roles = tokenDecoded.roles;
        const email = tokenDecoded.email;
        const firstName = tokenDecoded.firstName;
        const lastName = tokenDecoded.lastName;
        const passwordChanged = tokenDecoded.passwordChanged;
        this._authenticatedUser.passwordChanged = passwordChanged;
        this._authenticatedUser.username = username;
        this._authenticatedUser.lastName = lastName;
        this._authenticatedUser.firstName = firstName;
        this._authenticatedUser.email = email;
        this._authenticatedUser.roles = roles;
        console.log('this is the authenticated user', this.authenticatedUser);
        localStorage.setItem('autenticated', JSON.stringify(true));
        this.authenticated = true;
        this._loggedIn.next(true);

    }

    public hasRole(role: Role): boolean {
        const index = this._authenticatedUser.roles.findIndex(r => r.authority == role.authority);
        return index > -1 ? true : false;
    }

    public register() {
        console.log(this.user);
        this.http.post<any>(this.API + "/api/users/save", this.user, {observe: 'response'}).subscribe(
            resp => {
                this.router.navigate(['/login']);

            }, (error: HttpErrorResponse) => {
                console.log(error.error)
            }
        );
    }

    public logout() {
        this.tokenService.removeToken();
        localStorage.setItem('autenticated', JSON.stringify(false));
        this.authenticated = false;
        this._loggedIn.next(false);
        this._authenticatedUser = new User();
        this.router.navigate(['login']);
    }
}
