import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Token recibido:', response.access_token);
        this.authService.setToken(response.access_token);
        this.router.navigate(['/documents']);
    },
    error: (error) => {
        console.error('Error de login:', error);
        this.errorMessage = '¡Error, Usuario o contraseña incorrectos!';
      }
    });
  }

}
