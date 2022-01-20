import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {User} from './controller/model/User.model';
import {AuthService} from './controller/service/Auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(public app: AppComponent, public appMain: AppMainComponent, private authService: AuthService) {
    }

    get authenticatedUser(): User {
        return this.authService.authenticatedUser;
    }

    ngOnInit(): void {
        // this.authService.loadInfos()
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

    }

    logout() {
        this.authService.logout();
    }
}
