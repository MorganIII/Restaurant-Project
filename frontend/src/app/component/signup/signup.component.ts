import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpaceValidator } from 'src/app/model/space-validator';
import { AuthenticationService } from 'src/app/service/security/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpParentGroup: FormGroup;

  constructor(private formChildGroup: FormBuilder,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.myFormSignUp();
  }

  myFormSignUp() {
    this.signUpParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        email: new FormControl('',[
          Validators.required,
          SpaceValidator.notOnlySpace,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ]),
        password: new FormControl('',[
          Validators.required,

        ])
      })
    })
  }

  signup(){
    if(this.signUpParentGroup.invalid){
      this.signUpParentGroup.markAllAsTouched();
      return;
    }
    const email = this.signUpParentGroup.controls['user'].value.email;
    const password = this.signUpParentGroup.controls['user'].value.password;
    this.auth.signup(email, password).subscribe({
      next: response => {
        if(response.result == 1){
          sessionStorage.setItem('emailNotActivated', email);
          this.router.navigate(['/activate']);
        }
        else{
          alert('Email already exists');
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }


  get email(){
    return this.signUpParentGroup.get('user.email');
  }

  get password(){
    return this.signUpParentGroup.get('user.password');
  }
}
