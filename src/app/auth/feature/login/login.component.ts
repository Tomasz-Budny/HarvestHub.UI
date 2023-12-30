import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { UserContextService } from '../../data-access/user-context.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public userContextService: UserContextService
  ) {
    effect(() => {
      if(this.userContextService.user() && this.isSubmitted) {
        this.router.navigate(['dashboard']);
      }
      if(this.userContextService.error()) {
        this.isSubmitted = false;
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.isSubmitted = true;
      this.authService.login(this.loginForm.value);
    }
  }
}
