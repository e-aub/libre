import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDropdown } from '../user/user-dropdown/user-dropdown';
import { SidebarService } from '../sidebar/sidebar-service/sidebar-service';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    UserDropdown,
    MatIcon
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  sidebarService = inject(SidebarService);
}
