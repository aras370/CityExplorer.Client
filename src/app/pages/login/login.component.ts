import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Login Form Interface
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {

  // Login form model
  loginForm: LoginForm = {
    email: '',
    password: '',
    rememberMe: false
  };

  // Form states
  isSubmitting = false;
  showPassword = false;
  loginError = '';
  isSuccess = false;

  // Form validation errors
  errors = {
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Validate email
  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.loginForm.email) {
      this.errors.email = 'ایمیل الزامی است';
    } else if (!emailRegex.test(this.loginForm.email)) {
      this.errors.email = 'فرمت ایمیل صحیح نیست';
    } else {
      this.errors.email = '';
    }
  }

  // Validate password
  validatePassword(): void {
    if (!this.loginForm.password) {
      this.errors.password = 'رمز عبور الزامی است';
    } else if (this.loginForm.password.length < 6) {
      this.errors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    } else {
      this.errors.password = '';
    }
  }

  // Check if form is valid
  isFormValid(): boolean {
    this.validateEmail();
    this.validatePassword();
    if (!this.errors.email && !this.errors.password &&
      this.loginForm.email && this.loginForm.password)
      return true;
    else
      return false
  }

  // Submit login form
  onSubmit(): void {
    if (this.isFormValid()) {
      this.isSubmitting = true;
      this.loginError = '';

      // Simulate login API call
      setTimeout(() => {
        this.isSubmitting = false;

        // Simulate login success/failure
        if (this.loginForm.email === 'test@example.com' && this.loginForm.password === '123456') {
          this.isSuccess = true;
          setTimeout(() => {
            // Redirect to dashboard or home page
            console.log('Redirecting to dashboard...');
          }, 1500);
        } else {
          this.loginError = 'ایمیل یا رمز عبور اشتباه است';
        }
      }, 2000);
    }
  }

  // Social login methods
  loginWithGoogle(): void {
    console.log('Login with Google');
  }

  loginWithFacebook(): void {
    console.log('Login with Facebook');
  }

  // Forgot password
  forgotPassword(): void {
    console.log('Forgot password clicked');
  }
}