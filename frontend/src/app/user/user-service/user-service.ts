import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { enviroment } from '../../../enviroment';

export interface UserDetails {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userDetails = signal<UserDetails | null>(null);
  readonly userDetails: Signal<UserDetails | null> = this._userDetails;

  constructor(private http: HttpClient) {
    this.fetchCurrentUser();
  }

  private fetchCurrentUser(): void {
    this.http.get(`${enviroment.apiUrl}/users/current_user`, { withCredentials: true }).subscribe({
      next: (user) => {
        console.log('Current user data:', user);
        this._userDetails.set(user as UserDetails);
      },
      error: (err) => {
        console.error('Error fetching current user data:', err);
      }
    });
  }

  getUserDetails(): Signal<UserDetails | null> {
    return this.userDetails;
  }
}
