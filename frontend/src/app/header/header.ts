import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDropdown } from '../user/user-dropdown/user-dropdown';
import { SidebarService } from '../sidebar/sidebar-service/sidebar-service';



@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    UserDropdown
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  sidebarService = inject(SidebarService);
}
