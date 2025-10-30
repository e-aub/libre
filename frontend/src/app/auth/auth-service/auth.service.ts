import { HttpClient, HttpEvent } from "@angular/common/http";
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

// {sub: 'aelhadda', role: 'USER', iat: 1761784505, exp: 1761785405}
interface Claims{
    sub : string,
    role : string,
    iat : number,
    exp : number,
}

@Injectable({providedIn : 'root'})
export class AuthService {
    private accessToken = signal<string | null>(null);

    isLoggedIn = computed(()=> {
        if (this.accessToken()){
            try{
                console.log(this.accessToken());
                const base64 = this.accessToken()!.split(".")[1].replace(/-/g, '+').replace(/_/g, '/');

                const claims = JSON.parse(atob(base64));
                console.log(claims.exp);
            if (typeof claims?.exp !== 'number'){
                throw false;
            }
                console.log("got here")
          console.log(`angular date: ${new Date(Date.now()).toUTCString()}
                    jwt date: ${new Date(claims.exp * 1000).toUTCString()}`);

            return Date.now() < claims.exp * 1000;
            }catch (e){
                console.log(e);
                return false;
            }
            
        }
        return false;
    });

    getAccessToken() : string | null{
        return this.accessToken();
    }

    setAccessToken(token : string | null) : void{
        this.accessToken.set(token);
    }

    constructor(private http: HttpClient){}

    login(loginData : LoginData): Observable<void>{
        return this.http.post<AuthResponse>(`${enviroment.apiUrl}/auth/login`, loginData,{
            withCredentials: true,
        }).pipe(
            tap(res => this.accessToken.set(res.accessToken)),
            tap(() => console.log('Login successful')),
            tap((res) => console.log(res.accessToken)),
            map(()=> undefined),
        );
    }

    refresh() : Observable<string>{
        return this.http.post<AuthResponse>(`${enviroment}/auth/refresh`, {}, {
            withCredentials : true
        }).pipe(
            tap(res => this.accessToken.set(res.accessToken)),
            map(res => res.accessToken)
        );
    }

    logout() : Observable<void>{
        return this.http.post<void>(`${enviroment.apiUrl}/auth/logout`, {}, {
            withCredentials : true
        }).pipe(map(()=> {
            this.accessToken.set(null);
        }))
    }

    register(RegisterData : RegisterData) : Observable<void>{
        return this.http.post<void>(`${enviroment.apiUrl}/auth/register`, RegisterData).pipe(
            tap(() => console.log('Registration successful')),
        );
    }
}