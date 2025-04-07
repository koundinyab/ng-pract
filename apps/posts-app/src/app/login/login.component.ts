import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

function userNameValidator(control: AbstractControl) {
  const value = control.value;
  if (value && value.length > 5) {
    return { userNameLength: true };
  } else {
    return null;
  }
}

function passwordValidator(control: AbstractControl) {
  const value = control.value;
  const hasUpperCase = /[A-Z]/.test(value);
  const isLengthValid = value && value.length >= 6;

  if (!isLengthValid) {
    return { passwordLength: true };
  }
  if (!hasUpperCase) {
    return { passwordUpperCase: true };
  }
  return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: 'login.component.less',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
})
export class LoginComponent implements OnInit {
  showLoginForm = true;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  checkValue = '';
  countries = [
    { code: 'india', name: 'India' },
    { code: 'usa', name: 'USA' },
    { code: 'germany', name: 'Germany' },
  ];
  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, userNameValidator]),
      password: new FormControl('', [Validators.required, passwordValidator]),
    });
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  public ngOnInit(): void {
    this.registrationForm.get('country')?.valueChanges.subscribe((value) => {
      if (value === 'india') {
        this.addIndiaFields();
      }
    });
  }

  public submitLoginForm(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === 'user' && password === 'Password123') {
        console.log('success');
        this.router.navigate(['/posts']);
      }
    }
  }

  public toggleFormToShow(): void {
    this.showLoginForm = !this.showLoginForm;
  }

  addIndiaFields(): void {
    this.registrationForm.addControl(
      'indiaFields',
      new FormGroup({
        city: new FormControl('', [Validators.required]),
      })
    );
  }
}
