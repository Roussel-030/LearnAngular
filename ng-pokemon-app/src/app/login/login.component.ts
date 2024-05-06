import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [],
    standalone: true,
    imports: [FormsModule, NgIf]
})
export class LoginComponent implements OnInit {
  message: string = 'Vous etes deconnecte';
  name: string;
  password: string;
  authService: AuthService;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService = this.auth;
  }

  setMessage(): void {
    if (this.auth.isLoggedIn) {
      this.message = 'Vous etes connecté';
    }
    else {
      this.message = 'Identifiant ou mot de passe incorrect';
    }
  }

  login() {
    this.message = "Tentative de connection en cours";
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if(isLoggedIn) {
          this.router.navigate(['/pokemons']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
      });
  }

  logout() {
    this.auth.logout();
    this.message = "Vous etes deconnecte";
  }
}
