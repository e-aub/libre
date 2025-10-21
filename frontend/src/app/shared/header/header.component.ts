import { NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ModalService } from "../../core/modal.service";


@Component(
    {
        selector : 'app-header',
        template: `
            <header class="header-container">
                <div class="header-content">
                <a href="/" class="logo-link">
                    <img src="logo.png" alt="Libre Logo" class="logo-img">
                </a>
                
                <div class="actions">
                    <button class="btn secondary-btn" (click)="openSignup()">Join us</button> 
                    <button class="btn primary-btn" (click)="openLogin()">Login</button>
                </div>
                </div>
            </header>
                `,
        styleUrl : './header.component.css',
        imports : [NgOptimizedImage],
    })
export class HeaderComponent{
    private modalService = inject(ModalService);
    openLogin(){
        this.modalService.openModal('login');
    }

    openSignup(){
        this.modalService.openModal('register');
    }
}