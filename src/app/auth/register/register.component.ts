import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/controller/model/User.model';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {Role} from "../../controller/model/Role.model";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    role: Role = new Role();
    registerForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private authService: AuthService) {
    }

    get user(): User {
        return this.authService.user;
    }

    set user(value: User) {
        this.authService.user = value;
    }

    ngOnInit(): void {
        this.role.authority = 'ROLE_SUPER_ADMIN';
    }

    submit() {
        const formValues = this.registerForm.value;
        const {firstName, lastName, userName, password, email} = formValues;
        this.user.firstName = firstName;
        this.user.lastName = lastName;
        this.user.username = userName;
        this.user.password = password;
        this.user.email = email;
        this.user.roles.push(this.role);
        this.authService.register();
    }

}
