import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpaceValidator } from 'src/app/model/space-validator';
import { AuthenticationService } from 'src/app/service/security/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginParentGroup: FormGroup;

  constructor(private formChildGroup: FormBuilder,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.myFormLogin();
  }

  myFormLogin() {
    this.loginParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        email: new FormControl('',[
          Validators.required,
          SpaceValidator.notOnlySpace,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ]),
        password: new FormControl('',[
          Validators.required
        ])
      })
    })
  }

  login(){
    if(this.loginParentGroup.invalid){
      this.loginParentGroup.markAllAsTouched();
      return;
    }
    const email = this.loginParentGroup.controls['user'].value.email;
    const password = this.loginParentGroup.controls['user'].value.password;
    this.auth.checkActivation(email, password).subscribe({
      next: response => {
        let result = response;
        if(result == 1){
          this.auth.authenticate(email, password).subscribe({
            next: response => {
              console.log(response);
              this.router.navigate(['/orders']);
            }
          });
        } else if(result == 0) {
            sessionStorage.setItem('emailNotActivated', email);
            alert('You need to activate your email');
            this.router.navigate(['/activate']);
        } else{
            alert('Email or password is incorrect');
        }
      }
    });
  }

  get email(){
    return this.loginParentGroup.get('user.email');
  }

  get password(){
    return this.loginParentGroup.get('user.password');
  }
}
