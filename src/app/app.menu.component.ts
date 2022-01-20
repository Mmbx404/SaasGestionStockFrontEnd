import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger,} from "@angular/animations";
import {AppComponent} from "./app.component";
import {AppMainComponent} from "./app.main.component";
import {AuthService} from "./controller/service/Auth.service";
import {RoleService} from "./controller/service/role.service";

@Component({
    selector: "app-menu",
    templateUrl: "./app.menu.component.html",
    animations: [
        trigger("inline", [
            state(
                "hidden",
                style({
                    height: "0px",
                    overflow: "hidden",
                })
            ),
            state(
                "visible",
                style({
                    height: "*",
                })
            ),
            state(
                "hiddenAnimated",
                style({
                    height: "0px",
                    overflow: "hidden",
                })
            ),
            state(
                "visibleAnimated",
                style({
                    height: "*",
                })
            ),
            transition(
                "visibleAnimated => hiddenAnimated",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
            transition(
                "hiddenAnimated => visibleAnimated",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
        ]),
    ],
})
export class AppMenuComponent implements OnInit {
    model: any[];
    modelsuperadmin: any[];
    modelanonymous: any[];
    modeladministrateur: any[];

    constructor(public app: AppComponent,
                public appMain: AppMainComponent,
                private roleService: RoleService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {

        this.modelanonymous = [
            {
                label: "Denied",
                icon: "pi pi-fw pi-home",
                routerLink: ["denied"]
            }
        ];
        this.modelsuperadmin = [
            {
                label: "Favorites",
                icon: "pi pi-fw pi-home",
                items: [
                    {
                        label: "Commande",
                        icon: "pi pi-money-bill",
                        routerLink: ["commande/crud"],
                    },
                    {
                        label: "Produit",
                        icon: "pi pi-shopping-cart",
                        routerLink: ["produit/crud"],
                    },
                    this.authService.authenticatedUser.username === 'admin' ?
                        {
                            label: "User",
                            icon: "pi pi-user",
                            routerLink: ["user/crud"],
                        } : {},
                ]
            }
        ];
        this.modeladministrateur =
            [
                {
                    label: "Administrateur",
                    icon: 'pi pi-check',
                    items: []
                }
            ];
        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roles) {

                this.authService.authenticatedUser.roles.forEach(role => {
                    const roleName: string = this.getRole(role);
                    this.roleService._role.next(roleName.toUpperCase());
                    eval("this.model = this.model" + this.getRole(role));
                })
            }

        }
    }

    getRole(text) {
        const [role, ...rest] = text.split('_');
        return rest.join('').toLowerCase()
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
