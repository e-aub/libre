import { Component, inject, signal, Signal } from "@angular/core";
import { JsonPipe } from '@angular/common';
import { Header } from "../../header/header";
import { UserDropdown } from "../../user/user-dropdown/user-dropdown";
import { UserDetails, UserService } from "../../user/services/user-service/user-service";
import { Router } from "@angular/router";



@Component({
    selector: 'app-home',
    imports: [JsonPipe, Header, UserDropdown],
    standalone: true,
    template: `
        <app-header></app-header>
        <h1>Home Page</h1>
        <p>userDeatails: {{ userDetails() | json }}</p>
        <button (click)="welcome()">Back to welcome</button>
    `,
})
export class HomeComponent {
    private userService : UserService = inject(UserService);
    userDetails : Signal<UserDetails | null> = this.userService.getUserDetails();
    router = inject(Router);

    welcome(){
        this.router.navigateByUrl("/welcome");
    }
}