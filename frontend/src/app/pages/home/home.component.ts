import { Component, inject, signal, Signal } from "@angular/core";
import { Header } from "../../header/header";
import { UserDetails, UserService } from "../../user/services/user-service/user-service";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth-service/auth.service";
import { WelcomeComponent } from "../welcome/welcome.component";



@Component({
    selector: 'app-home',
    imports: [Header, WelcomeComponent],
    standalone: true,
    template: `
        <p>this is home</p>
    `,
})
export class HomeComponent {
    private userService : UserService = inject(UserService);
    authService = inject(AuthService);
    userDetails : Signal<UserDetails | null> = this.userService.getUserDetails();
    router = inject(Router);
}