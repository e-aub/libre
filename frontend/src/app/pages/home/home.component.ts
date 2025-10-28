import { Component, inject, signal, Signal } from "@angular/core";
import { UserService } from "../../user/user-service/user-service";
import { UserDetails } from "../../user/user-service/user-service";
import { JsonPipe } from '@angular/common';
import { Header } from "../../header/header";



@Component({
    selector: 'app-home',
    imports: [JsonPipe, Header],
    standalone: true,
    template: `
        <app-header></app-header>
        <h1>Home Page</h1>
        <p>userDeatails: {{ userDetails() | json }}</p>
    `,
})
export class HomeComponent {
    private userService : UserService = inject(UserService);
    userDetails : Signal<UserDetails | null> = this.userService.getUserDetails();
}