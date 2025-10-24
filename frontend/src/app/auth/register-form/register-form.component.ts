import { Component, inject } from "@angular/core";
import { ModalService } from "../../core/modal.service";
import { FormControl, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-register-form',
    styleUrls: ['../login-register-form.component.css'],
    imports : [ReactiveFormsModule],
    template: `
    <h2 class="auth-title h1-title">Join us.</h2>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">

        <div class="two-fields-wrapper">
            <input type="text" placeholder="First Name" formControlName="firstName" class="form-input">
            <input type="text" placeholder="Last Name" formControlName="lastName" class="form-input">
        </div>
        @if (registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched) {
          <p class="error-message">Last name must be 3–20 alphabetic characters</p>
        }@else if (registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched) {
          <p class="error-message">First name must be 3–20 alphabetic characters</p>
        }

      <input type="text" placeholder="Username" formControlName="username" class="form-input">
      @if (registerForm.get('username')?.invalid && registerForm.get('username')?.touched) {
        <p class="error-message">Username must be 3–20 chars, alphanumeric or underscore</p>
      }

      <input type="email" placeholder="Email" formControlName="email" class="form-input">
      @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
        <p class="error-message">Enter a valid email address</p>
      }

      <div class="two-fields-wrapper">
        <input type="password" placeholder="Password" formControlName="password" class="form-input">
        <input type="password" placeholder="Repeat Password" formControlName="repeatedPassword" class="form-input">
      </div>
      @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
          <p class="error-message">
            Password must be at least 8 chars, include uppercase, lowercase, digit, and special character
          </p>
        }@else if (registerForm.errors?.['passwordMismatch'] && registerForm.get('repeatedPassword')?.touched) {
          <p class="error-message">Passwords do not match</p>
        }

      <input type="number" placeholder="Age" formControlName="age" class="form-input">
      @if (registerForm.get('age')?.invalid && registerForm.get('age')?.touched) {
        <p class="error-message">Age must be between 13 and 120</p>
      }

      <div class="actions">
        <button type="submit" [disabled]="registerForm.invalid" class="btn primary-btn main-btn">Register</button>

        <div class="separator">
          Already have an account?
          <a href="#" (click)="authModalService.openModal('login')" class="switch-link">Sign in</a>
        </div>
      </div>
    </form>
  `
})
export class RegisterFormComponent {
    authModalService = inject(ModalService);

    private readonly NAME_REGEX = /^[A-Za-z ]{3,20}$/;
    private readonly USERNAME_REGEX = /^[A-Za-z0-9_]{3,20}$/;
    private readonly EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
    private readonly PASSWORD_REGEX =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    registerForm = new FormGroup(
        {
            firstName: new FormControl('', [Validators.required, Validators.pattern(this.NAME_REGEX)]),
            lastName: new FormControl('', [Validators.required, Validators.pattern(this.NAME_REGEX)]),
            username: new FormControl('', [Validators.required, Validators.pattern(this.USERNAME_REGEX)]),
            email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]),
            password: new FormControl('', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]),
            repeatedPassword: new FormControl('', [Validators.required]),
            age: new FormControl('', [Validators.required, Validators.min(13), Validators.max(120)])
        },
        { validators: passwordMatchValidator }
    );

    onSubmit() {
        if (this.registerForm.valid) {
            console.log('Form submitted:', this.registerForm.value);
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirm = group.get('repeatedPassword')?.value;
    return pass && confirm && pass !== confirm ? { passwordMismatch: true } : null;
};
