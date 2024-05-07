import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] = [];
  user: any;
  constructor(public auth: AuthService) { }


  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-chart-line',
        routerLink: ['/dashboard']
      }
    ];

    if (this.user) {
      this.items.push({
        label: this.user.displayName,
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            command: () => this.auth.signOut()
          }
        ]
      });
    }
  }

}
