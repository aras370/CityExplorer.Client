import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Register Form Interface
export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent implements OnInit {
  
  // Register form model
  registerForm: RegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  };

  // Form states
  isSubmitting = false;
  showPassword = false;
  showConfirmPassword = false;
  registerError = '';
  isSuccess = false;

  // Form validation errors
  errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: ''
  };

  // Password strength
  passwordStrength = {
    score: 0,
    label: '',
    color: ''
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }

  // Toggle password visibility
  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Validate first name
  validateFirstName(): void {
    if (!this.registerForm.firstName.trim()) {
      this.errors.firstName = 'نام الزامی است';
    } else if (this.registerForm.firstName.trim().length < 2) {
      this.errors.firstName = 'نام باید حداقل ۲ کاراکتر باشد';
    } else {
      this.errors.firstName = '';
    }
  }

  // Validate last name
  validateLastName(): void {
    if (!this.registerForm.lastName.trim()) {
      this.errors.lastName = 'نام خانوادگی الزامی است';
    } else if (this.registerForm.lastName.trim().length < 2) {
      this.errors.lastName = 'نام خانوادگی باید حداقل ۲ کاراکتر باشد';
    } else {
      this.errors.lastName = '';
    }
  }

  // Validate email
  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.registerForm.email) {
      this.errors.email = 'ایمیل الزامی است';
    } else if (!emailRegex.test(this.registerForm.email)) {
      this.errors.email = 'فرمت ایمیل صحیح نیست';
    } else {
      this.errors.email = '';
    }
  }

  // Validate password and check strength
  validatePassword(): void {
    const password = this.registerForm.password;
    
    if (!password) {
      this.errors.password = 'رمز عبور الزامی است';
      this.passwordStrength = { score: 0, label: '', color: '' };
      return;
    }

    if (password.length < 8) {
      this.errors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
    } else {
      this.errors.password = '';
    }

    // Calculate password strength
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        this.passwordStrength = { score: 1, label: 'ضعیف', color: '#e53e3e' };
        break;
      case 2:
        this.passwordStrength = { score: 2, label: 'متوسط', color: '#dd6b20' };
        break;
      case 3:
        this.passwordStrength = { score: 3, label: 'خوب', color: '#d69e2e' };
        break;
      case 4:
      case 5:
        this.passwordStrength = { score: 4, label: 'قوی', color: '#38a169' };
        break;
    }
  }

  // Validate confirm password
  validateConfirmPassword(): void {
    if (!this.registerForm.confirmPassword) {
      this.errors.confirmPassword = 'تکرار رمز عبور الزامی است';
    } else if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.errors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیستند';
    } else {
      this.errors.confirmPassword = '';
    }
  }

  // Validate phone
  validatePhone(): void {
    const phoneRegex = /^09[0-9]{9}$/;
    if (this.registerForm.phone && !phoneRegex.test(this.registerForm.phone)) {
      this.errors.phone = 'فرمت شماره موبایل صحیح نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)';
    } else {
      this.errors.phone = '';
    }
  }

  // Validate terms agreement
  validateTerms(): void {
    if (!this.registerForm.agreeToTerms) {
      this.errors.agreeToTerms = 'پذیرش قوانین و مقررات الزامی است';
    } else {
      this.errors.agreeToTerms = '';
    }
  }

  // Check if form is valid
  isFormValid(): boolean {
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    this.validatePhone();
    this.validateTerms();

    if(!Object.values(this.errors).some(error => error !== '') &&
           this.registerForm.firstName &&
           this.registerForm.lastName &&
           this.registerForm.email &&
           this.registerForm.password &&
           this.registerForm.confirmPassword &&
           this.registerForm.agreeToTerms){
            return true
           } else 
           return false
  }

  // Submit register form
  onSubmit(): void {
    if (this.isFormValid()) {
      this.isSubmitting = true;
      this.registerError = '';
      
      // Simulate register API call
      setTimeout(() => {
        this.isSubmitting = false;
        
        // Simulate registration success/failure
        if (this.registerForm.email === 'existing@example.com') {
          this.registerError = 'این ایمیل قبلاً ثبت شده است';
        } else {
          this.isSuccess = true;
          setTimeout(() => {
            // Redirect to login or dashboard
            console.log('Redirecting to login...');
          }, 3000);
        }
      }, 2000);
    }
  }

  // Social register methods
  registerWithGoogle(): void {
    console.log('Register with Google');
  }

  registerWithFacebook(): void {
    console.log('Register with Facebook');
  }
}