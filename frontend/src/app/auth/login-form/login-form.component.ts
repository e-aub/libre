import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector : 'app-login-form',
    imports : [ReactiveFormsModule],
    styleUrl : './login-form.component.css',
    template : `
        <h2 class="auth-title h1-title">Welcome back.</h2>
        <form [formGroup]="loginForm" (ngSubmit)=onSubmit() class="auth-form">
            <input type="email" placeholder="Username or Email" formControlName="usernameOrEmail" class="form-input">
            @if (loginForm.get('usernameOrEmail')?.invalid && loginForm.get('usernameOrEmail')?.touched){
                <p class="error-message">Valid Email is required</p>
            }

            <input type="password" placeholder="Password" formControlName="password" class="form-input">
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched){
                <p class="error-message">Valid Password is required</p>
            }
            
            <a href="#" class="forgot-link">Forgot Password?</a>
            
            <div class="actions">
                <button type="submit" [disabled]="loginForm.invalid" class="btn primary-btn main-btn">Log in</button>
                <button class="btn google-btn">
                    <img src="google-logo.svg" alt="Google" class="google-logo">
                    Log in with Google
                </button>
            </div>
        </form>
    `
})

export class LoginFormComponent{
    loginForm = new FormGroup({
        usernameOrEmail : new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))]),
    })

    onSubmit(){
        console.log(this.loginForm.controls)
    }
}