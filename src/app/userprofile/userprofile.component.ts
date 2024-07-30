import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../SERVICE/user.service';
import { AuthenticationService } from '../SERVICE/authentication.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit{

  avatarUrl: string = 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'; // Set your default avatar path
  selectedUser!: User;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService // Inject AuthenticationService
  ) { }

  ngOnInit(): void {
    const userMail = this.authService.getUserMail();
    if (userMail) {
      this.loadUserByMail(userMail);
    } else {
      console.error('No user mail found');
    }
  }

  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.selectedUser = user;
        this.avatarUrl = user.photo || this.avatarUrl;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  loadUserByMail(mail: string): void {
    this.userService.getUserByMail(mail).subscribe({
      next: (user) => {
        this.selectedUser = user;
        this.avatarUrl = user.photo || this.avatarUrl;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  onAvatarClick(): void {
    const avatarInput = document.getElementById('avatarInput') as HTMLInputElement;
    avatarInput.click();
  }

  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: (updatedUser) => {
          this.selectedUser = updatedUser;
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }

}


//ça marche avec id 12 pace que je me suis connecte avec l'adresse mail correspondant à l'utilisateur qui a id 12
//ce que je veux c'est d'ecrire un service qui recupere l'adresse mail de l'utilisateur qui s'est connecté sur la login.component.ts afin de retrouver son id est l'envoyer 