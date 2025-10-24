import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal, Signal } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { enviroment } from "../../../enviroment";

interface AuthResponse{
    accessToken : string,
}

interface RegisterData{
    firstName : string,
    lastName : string,
    age : number,
    email : string,
    username : string,
    password : string,
    repeatedPassword : string,
}

interface LoginData{
    emailOrUsername : string,
    password : string,
}

@Injectable({providedIn : 'root'})
export class AuthService {
    private accessToken = signal<string | null>(null);

    isLoggedIn = computed(()=> {
        return !!this.accessToken;
    });

    constructor(private http: HttpClient){}

    login(loginData : LoginData): Observable<void>{
        return this.http.post<AuthResponse>(`${enviroment.apiUrl}/auth/login`, loginData).pipe(
            tap(res => this.accessToken.set(res.accessToken)),
            tap(() => console.log('Login successful')),
            map(()=> undefined),
        );
    }

    logout() : Observable<void>{
        return this.http.post<void>(`${enviroment.apiUrl}/auth/logout`, {}).pipe(map(()=> {
            this.accessToken.set(null);
        }))
    }

    register(RegisterData : RegisterData) : Observable<void>{
        return this.http.post<void>(`${enviroment.apiUrl}/auth/register`, RegisterData).pipe(
            tap(() => console.log('Registration successful')),
        );
    }
}