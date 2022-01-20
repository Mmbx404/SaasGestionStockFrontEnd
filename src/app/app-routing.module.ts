import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CompteComponent} from './view/compte/compte.component';
import {CommandeComponent} from './view/commande/commande.component';
import {ProduitComponent} from './view/produit/produit.component';
import {AppMainComponent} from './app.main.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AccessDeniedComponent} from './auth/access-denied/access-denied.component';
import {UserListComponent} from './view/user-list/user-list.component';
import {HomeComponent} from './demo/view/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {path: '', redirectTo: 'login', pathMatch: 'full'},
                {path: "login", component: LoginComponent},
                {path: "register", component: RegisterComponent},
                {
                    path: "app",
                    component: AppMainComponent,
                    children: [
                        {path: 'compte', children: [{path: 'crud', component: CompteComponent}]},
                        {path: 'commande', children: [{path: 'crud', component: CommandeComponent}]},
                        {path: 'produit', children: [{path: 'crud', component: ProduitComponent}]},
                        {path: 'denied', component: AccessDeniedComponent},
                        {path: 'user', children: [{path: 'crud', component: UserListComponent}]},
                        {path: 'home', component: HomeComponent},
                        {path: '', redirectTo: 'home', pathMatch: 'full'},
                    ],
                },
                {path: '**', redirectTo: 'login', pathMatch: 'full'}
            ],
            {scrollPositionRestoration: "enabled"}
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
