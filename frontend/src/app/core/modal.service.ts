import { Injectable, signal, WritableSignal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

type modalType = null | 'login' | 'register';
@Injectable(
    {
        providedIn : "root",
    }    
)
export class ModalService{
    modalState : WritableSignal<modalType> = signal(null);

    openModal(type : modalType){
        this.modalState.set(type);
    }

    closeModal(){
        this.modalState.set(null);
    }
}