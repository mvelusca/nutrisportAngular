import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../SERVICE/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  private usersSubscription: Subscription | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersSubscription = this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        console.log('Users:', this.users); // Utilisation de console.log pour vérifier les utilisateurs récupérés
      },
      error: (error) => {
        console.error('Error fetching users:', error); // Gestion des erreurs
      }
    });
  }

  ngOnDestroy(): void {
    // Assurez-vous de désabonner l'observable pour éviter les fuites de mémoire
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

}
