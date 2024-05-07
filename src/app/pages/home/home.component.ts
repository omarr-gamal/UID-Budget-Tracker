import { Component } from '@angular/core';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public firestore: Firestore, public auth: AuthService, public userService: UserService) {
    
  }
}
