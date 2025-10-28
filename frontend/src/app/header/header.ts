import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDropdown } from '../user/user-dropdown/user-dropdown';



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

}
