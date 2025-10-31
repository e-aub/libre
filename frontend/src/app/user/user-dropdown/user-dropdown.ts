import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../auth/auth-service/auth.service';
import { UserService } from '../services/user-service/user-service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-dropdown',
  imports: [RouterLink, MatIcon],
  templateUrl: './user-dropdown.html',
  styleUrl: './user-dropdown.css'
})


export class UserDropdown {
    visible = signal<boolean>(false);
    authService = inject(AuthService);
    userDetailes = inject(UserService).getUserDetails();
    router = inject(Router);

    logout(){
      this.authService.logout().subscribe(
        {
          complete : () =>{
            this.router.navigateByUrl('/welcome')
          },
          error : (err) => console.log(err)
        }
      )
    }

    toggleDropdown(event : MouseEvent){
      event.preventDefault();
      event.stopPropagation();
      this.visible.set(!this.visible());
    }
    @HostListener('document:click', ['$event'])
    clickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-wrapper') && this.visible()) {
        this.visible.set(false);
      }
    }
}
