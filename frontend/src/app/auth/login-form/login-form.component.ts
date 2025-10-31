import { Component, inject, signal } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ModalService } from "../../core/modal.service";
import { AuthService } from "../auth-service/auth.service";
import { Router } from "@angular/router";



@Component({
    selector : 'app-login-form',
    imports : [ReactiveFormsModule],
    styleUrl : '../login-register-form.component.css',
    template : `
        <h2 class="auth-title h1-title">Welcome back.</h2>        
        <form [formGroup]="loginForm" (ngSubmit)=onSubmit() class="auth-form">
            <input type="email" placeholder="Username or Email" formControlName="emailOrUsername" class="form-input">
            @if (loginForm.get('emailOrUsername')?.invalid && loginForm.get('emailOrUsername')?.touched){
                <p class="error-message">Valid Email Or Username is required</p>
            }
            <span>
                <input [type]="passwordType()" placeholder="Password" formControlName="password" class="form-input password-input">
                <button type="button" class="toggle-btn" [class.flipped]="passwordType() == 'password'" (click)="toggleShowPassword()">👀</button>
            </span>
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched){
                <p class="error-message">Valid Password is required</p>
            }
            
            <a href="#" class="forgot-link">Forgot Password?</a>
            
            <div class="actions">
                <button type="submit" [disabled]="loginForm.invalid" class="btn primary-btn main-btn">Log in</button>
                @if (loginError()){
                        <p class="error-message login-error">{{ loginError() }}</p>
                }
                <div class="separator">
                    Don't have an account? 
                    <a href="#" (click)="authModalService.openModal('register')" class="switch-link">Sign up</a>
                </div>

                <button disabled class="btn google-btn">
                    <img src="google-logo.svg" alt="Google" class="google-logo">
                    Log in with Google
                </button>
            </div>
        </form>
    `
})


export class LoginFormComponent{
    
    authModalService = inject(ModalService);
    authService = inject(AuthService);
    loginError = signal<string | null>(null);
    passwordType = signal<'password' | 'text'>('password');
    constructor(private router : Router) {}


    toggleShowPassword(){
        this.passwordType.set(this.passwordType() === 'password' ? 'text' : 'password');
    }

   

    
    loginForm = new FormGroup({
        emailOrUsername : new FormControl('', [emailOrUsernameValidator]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))]),
    });

    


    onSubmit(){
        console.log(this.loginForm.controls)
        this.authService.login({
            emailOrUsername : this.loginForm.value.emailOrUsername!,
            password : this.loginForm.value.password!,
        }).subscribe({
            next : () => {
                this.loginError.set(null);
                this.authModalService.closeModal();
                const urlTree = this.router.parseUrl(this.router.url);
                const returnUrl = urlTree.queryParams['returnUrl'];
                if (returnUrl){
                    this.router.navigateByUrl(returnUrl);
                }else{
                    this.router.navigateByUrl("");
                }
                console.log(this.authService.isLoggedIn());
            },
            error : (err) => {
                console.error('Login failed', err.error);
                this.loginError.set(err.error?.error || 'An error occurred during login, Check your internet connection. Or try again later.');
            }
        });
    }
}

 export const emailOrUsernameValidator : ValidatorFn = (control : AbstractControl) : ValidationErrors | null => {
        const value  = control.value;
        if (value && value.includes('@')){
            return Validators.email(control) as AbstractControl;
        }
        return value === '' || value.length < 3 || value.length > 20 ? { invalidEmailOrUsername : true } : null;
        }
    