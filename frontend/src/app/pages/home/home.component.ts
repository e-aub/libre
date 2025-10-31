import { Component, inject, signal, Signal } from "@angular/core";
import { UserDetails, UserService } from "../../user/services/user-service/user-service";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth-service/auth.service";



@Component({
    selector: 'app-home',
    standalone: true,
    template: `
        <p>this is homedddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
    `,
})
export class HomeComponent {
    private userService : UserService = inject(UserService);
    authService = inject(AuthService);
    userDetails : Signal<UserDetails | null> = this.userService.getUserDetails();
    router = inject(Router);
}