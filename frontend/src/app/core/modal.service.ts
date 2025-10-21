import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

type modalType = null | 'login' | 'register';
@Injectable(
    {
        providedIn : "root",
    }    
)
export class modalService{
    private modalState = new BehaviorSubject<modalType>(null);

    public currentModal$ : Observable<modalType> = this.modalState.asObservable();

    openModal(type : modalType){
        this.modalState.next(type);
    }

    closeModal(){
        this.modalState.next(null);
    }
}