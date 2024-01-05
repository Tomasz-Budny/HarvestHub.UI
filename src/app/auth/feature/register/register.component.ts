import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EMPTY, Subject, catchError, switchMap } from 'rxjs';
import { RegisterRequest } from '../../data-model/register-request.model';
import { AuthService } from '../../data-access/auth.service';
import { AuthValidators } from '../../utils/auth-validators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted$: Subject<RegisterRequest> = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.submitted$.pipe(
      takeUntilDestroyed(),
      switchMap(req => this.authService.register(req).pipe(catchError(_ => EMPTY)))
    ).subscribe(_ => {
      this.router.navigate(['auth', 'login'])
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], [AuthValidators.EmailIsUnique(this.authService)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    }, {
      validators: [AuthValidators.match('password', 'confirmPassword')]
    });
  }

  onSubmit() {
    if(this.registerForm.valid) {
      const formBody = this.registerForm.value
      const registerRequest = new RegisterRequest(
        formBody.name, 
        formBody.surname, 
        formBody.email, 
        formBody.password
      );
      this.submitted$.next(registerRequest);
    }
  }
}
