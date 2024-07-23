import { Component, OnInit } from '@angular/core';
import { User,AddUser, UserService } from '../../SERVICE/user.service';
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
  newUser: AddUser = { nom: '', mail: '', mdp: '', photo: '' };
  private usersSubscription: Subscription | undefined;
  isModalOpen: boolean = false;
  selectedUser: User | undefined;
  deleteModalIsOpen: boolean = false;
  addModalIsOpen: boolean = false;

  currentPage: number = 1;
  usersPerPage: number = 10;
  totalUsers: number = 0;
  totalPages: number = 0;
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
 * Loads the list of users from the server and updates the local `users` array.
 * @returns void - This function does not return any value.
 * @throws Error - If an error occurs while fetching the users, it will be logged to the console.
 * @description This function subscribes to the `getUsers` observable from the `UserService` and updates 
 * the local `users` array when the observable emits a new value. If an error occurs during the fetching process, it logs the error to the console.
 */
  loadUsers(): void {
    this.usersSubscription = this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.totalUsers = users.length;
        this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
        this.updateUsersForCurrentPage();
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

  updateUsersForCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    this.users = this.users.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateUsersForCurrentPage();
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

  openViewModal(user: User): void {
    this.selectedUser = { ...user };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = undefined;
  }

  /**
 * Updates the selected user in the system.
 * @description This function updates the selected user's information by calling the `updateUser` 
 * method of the `UserService` with the selected user's ID and the updated user object as parameters. 
 * Upon successful update, it reloads the list of users and closes the edit modal. 
 * If an error occurs during the update process, it logs the error to the console.
 * @param none - No parameters are required for this function.
 * @returns void - This function does not return any value.
 * @throws Error - If an error occurs while updating the user, it will be logged to the console.
 */
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

  /**
 * Deletes the selected user from the system.
 * @param none - No parameters are required for this function.
 * @returns void - This function does not return any value.
 * @throws Error - If an error occurs while deleting the user, it will be logged to the console.
 * @description This function first checks if a user is selected. If a user is selected, it calls the `deleteUser` 
 * method of the `UserService` with the selected user's ID as a parameter. Upon successful deletion, it reloads 
 * the list of users and closes the delete modal. If an error occurs during the deletion process, it logs the error to the console.
 */
  deleteUser():void {
    if (this.selectedUser) {
      this.userService.deleteUser(this.selectedUser.id).subscribe({
        next: () => {
          // Remove the user from the list
          this.loadUsers();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
  closeDeleteModal() {
    this.deleteModalIsOpen = false;
    this.selectedUser = undefined;
  }
  openDeleteModal(user: User): void {
    this.selectedUser = { ...user };
    this.deleteModalIsOpen = true;
  }

  openAddModal() {
    this.addModalIsOpen = true;
  }

  closeAddModal() {
    this.addModalIsOpen = false;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newUser.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitAddUser(): void {
    this.userService.addUser(this.newUser).subscribe({
      next: (user) => {
        this.loadUsers();
        this.closeAddModal();
      },
      error: (error) => {
        console.error('Error adding user:', error);
      }
    });
  }

}
