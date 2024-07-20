import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../SERVICE/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  headerTable: String[] = [
    "ID","Name","Email","Actions"
  ];
  users: User[] = [];
  private usersSubscription: Subscription | undefined;
  isModalOpen: boolean = false;
  selectedUser: User | undefined;

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

  editUser(userId: number): void {
    console.log('Edit user:', userId);
    // Add your edit logic here
  }

  openEditModal(user: User): void {
    this.selectedUser = { ...user };
    this.isModalOpen = true;
  }

  openDeleteModal(user: User): void {
    this.selectedUser = { ...user };
    this.isModalOpen = true;
  }

  openViewModal(user: User): void {
    this.selectedUser = { ...user };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = undefined;
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: (updatedUser) => {
          // Update the user list
          this.loadUsers();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }

}
