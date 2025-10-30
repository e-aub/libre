import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../sidebar-service/sidebar-service';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
    sidebarService = inject(SidebarService);
}
