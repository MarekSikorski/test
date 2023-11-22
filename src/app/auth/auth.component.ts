import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, AuthResponseData } from './auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, ReactiveFormsModule, MatButtonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  form = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.emailFormControl;
    const password = this.form.value.passwordFormControl;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email!, password!);
    } else {
      authObs = this.authService.signup(email!, password!);
    }

    authObs.subscribe({
      next: (v) => {
        console.log(v);
        this.isLoading = false;
        this.router.navigate(['/content']);
      },
      error: (e) => {
        console.log(e);
        this.errorMessage = e;
        this.isLoading = false;
      },
      complete: () => console.info('complete')
    });

    this.form.reset();
  }
}