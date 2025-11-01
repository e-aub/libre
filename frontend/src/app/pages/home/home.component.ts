import { Component, inject, signal, Signal } from "@angular/core";
import { UserDetails, UserService } from "../../user/services/user-service/user-service";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth-service/auth.service";
import { MarkdownEditor } from "../markdown-editor/markdown-editor";



@Component({
    selector: 'app-home',
    standalone: true,
    template: `
        <app-markdown-editor></app-markdown-editor>
    `,
    imports: [MarkdownEditor],
})
export class HomeComponent {
    private userService : UserService = inject(UserService);
    authService = inject(AuthService);
    userDetails : Signal<UserDetails | null> = this.userService.getUserDetails();
    router = inject(Router);
}