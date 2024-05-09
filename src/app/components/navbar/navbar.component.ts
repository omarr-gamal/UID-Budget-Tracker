import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[] = [];
  user: any;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      this.updateMenuItems();
    });
  }
  activeMenu(event: any) {
    let node;
    if (event.target.tagName === 'A') {
      node = event.target;
    } else {
      node = event.target.parentNode;
    }
    let menuitem = document.getElementsByClassName('ui-menuitem-link');
    for (let i = 0; i < menuitem.length; i++) {
      menuitem[i].classList.remove('active');
    }
    node.classList.add('active');
  }

  updateMenuItems() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Transactions',
        icon: 'pi pi-money-bill',
        routerLink: ['/transactions'],
      },
      {
        label: 'Budgets',
        icon: 'pi pi-briefcase',
        routerLink: ['/budgets'],
      },
      {
        label: 'Reports',
        icon: 'pi pi-file',
        routerLink: ['/reports'],
      },
      {
        label: 'Incomes',
        icon: 'pi pi-wallet',
        routerLink: ['/incomes'],
      },
    ];

    if (this.user) {
      this.items.push({
        label: this.user.displayName,
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.auth.signOut(),
          },
        ],
      });
    }
  }

  redirectToLoginPage(): void {
    this.router.navigate(['/login']);
  }
}
