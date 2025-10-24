import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal, Signal } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { enviroment } from "../../../enviroment";

interface AuthResponse{
    accessToken : string,
}

@Injectable({providedIn : 'root'})
export class AuthService {
    private accessToken = signal<string | null>(null);

    isLoggedIn = computed(()=> {
        return !!this.accessToken;
    });

    constructor(private http: HttpClient){}

    login(emailOrUsername : string, password : string): Observable<void>{
        return this.http.post<AuthResponse>(`${enviroment.apiUrl}/auth`, {
            emailOrUsername,
            password
        }).pipe(
            tap(res => this.accessToken.set(res.accessToken)),
            tap(() => console.log('Login successful')),
            map(()=> undefined),
        );
    }

    logout() : void{
        this.accessToken.set(null);
        this.http.post()
    }
}