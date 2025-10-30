import { Component } from '@angular/core';
import { Header } from "../../header/header";
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Sidebar } from "../../sidebar/sidebar-component/sidebar";

@Component({
  selector: 'app-layout',
  imports: [Header, RouterModule, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
