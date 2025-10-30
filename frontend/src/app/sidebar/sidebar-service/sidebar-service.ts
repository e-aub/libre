import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface sidebarItem {
  name: string,
  // icon : string,
  path: string,
}

type groupType = "important" | "lessImportant";

interface sidebarGroup {
  type: groupType,
  elements: sidebarItem[],
}

@Injectable({
  providedIn: 'root'
})


export class SidebarService {
  private router = inject(Router);
  private globalItems: sidebarGroup[] = [
    {
      type: "important",
      elements: [
        {
          name: "Home",
          path: "/",
        },
        {
          name: "Profile",
          path: "/profile"
        },
        {
          name: "Following",
          path: "/following"
        }
      ]
    },
    {
      type: "lessImportant",
      elements: [
        { name: "Dashboard", path: "/dashboard" },
      ]
    }
  ]

  private dashBoardItems: sidebarGroup[] = [
    {
      type: "important",
      elements: [
        {
          name: "Users",
          path: "/users"
        }
      ]
    }
  ]
  opened = signal<boolean>(false);

  toggleSidebar() {
    this.opened.set(!this.opened());
  }

  getSidebarItems(): sidebarGroup[] {
    if (this.router.url == "/dashboard") {
      return this.dashBoardItems;
    }
    return this.globalItems;
  }
}
