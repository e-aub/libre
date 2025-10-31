import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface sidebarItem {
  name: string,
  icon: string,
  path: string,
}

@Injectable({
  providedIn: 'root'
})

export class SidebarService {
  private router = inject(Router);
  
  private globalItems: Record<string, sidebarItem[]> = {
    important: [
      {
        name: "Home",
        icon: "home",
        path: "/",
      },
      {
        name: "Profile",
        icon: "person",
        path: "/profile"
      },
      {
        name: "Following",
        icon: "people",
        path: "/following"
      }
    ],
    lessImportant: [
      { 
        name: "Dashboard", 
        icon: "dashboard",
        path: "/dashboard" 
      },
    ]
  };

  private dashBoardItems: Record<string, sidebarItem[]> = {
    important: [
      {
        name: "Overview",
        icon: "dashboard",
        path: "/dashboard"
      },
      {
        name: "Users",
        icon: "group",
        path: "/dashboard/users"
      },
      {
        name: "Analytics",
        icon: "analytics",
        path: "/dashboard/analytics"
      }
    ],
    lessImportant: [
      {
        name: "Settings",
        icon: "settings",
        path: "/dashboard/settings"
      }
    ]
  };
  
  opened = signal<boolean>(false);

  toggleSidebar() {
    this.opened.set(!this.opened());
  }

  getSidebarItems(): Record<string, sidebarItem[]> {
    if (this.router.url.startsWith("/dashboard")) {
      return this.dashBoardItems;
    }
    return this.globalItems;
  }
}