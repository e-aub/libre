import { Component, inject } from "@angular/core";
import { modalService } from "../../core/modal.service";
import { AsyncPipe } from "@angular/common";
import { LoginFormComponent } from "../login-form/login-form.component";
import { RegisterFormComponent } from "../register-form/register-form.component";

@Component(
   {selector : 'app-auth-modal',
        imports : [AsyncPipe, LoginFormComponent, RegisterFormComponent],
        standalone : true,
        template : `
        @if(currentModal$ | async; as currentModal){
            <div class="modal-backdrop" (click)="closeModal()">
            <div class="modal-content" (click)="$event.stopPropagation()">
            @if (currentModal == 'login'){
                <app-login-form/>
                }@else{
                    <app-register-form/>
                    }
                    </div>
                    </div>
                    }
                    `,
        styleUrl : './auth-modal.component.css',
   }
    
)

export class AuthModalComponent{
    private modalService = inject(modalService);

    public currentModal$ = this.modalService.currentModal$;

    closeModal(){
        this.modalService.closeModal();
    }
}