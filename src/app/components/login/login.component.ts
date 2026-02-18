import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms'; // Required for mat-select [(value)]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  selectedRole: string = 'PLAYER';

  loginWithGoogle() {
    console.log('Logging in as:', this.selectedRole);
    // This will eventually redirect to your Spring Boot Backend OAuth2 endpoint
window.location.href = `http://localhost:8080/oauth2/authorization/google?role=${this.selectedRole}`;
  }

  loginWithGithub() {
    console.log('GitHub login triggered');
  }
}