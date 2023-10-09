import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpaceValidator } from 'src/app/model/space-validator';
import { AuthenticationService } from 'src/app/service/security/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  sendEmailParentGroup: FormGroup;
  resetPasswordParentGroup: FormGroup;
  enableForm: boolean = false;
  constructor(private formChildGroup: FormBuilder,
              private auth: AuthenticationService,
              private router: Router)  {}

  ngOnInit(){
    this.sendEmailFormBuild();
    this.resetPasswordFormBuild();
  }



  sendEmailFormBuild() {
    this.sendEmailParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        email: new FormControl('',[
          Validators.required,
          SpaceValidator.notOnlySpace,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ])
      })
    })
  }

  resetPasswordFormBuild() {
    this.resetPasswordParentGroup = this.formChildGroup.group({
      newUser: this.formChildGroup.group({
        password: new FormControl('',[
          Validators.required
        ]),
        code: new FormControl('',[
          Validators.required,
          SpaceValidator.notOnlySpace
        ])
      })
    })
  }




  get email(){
    return this.sendEmailParentGroup.get('user.email');
  }

  get password(){
    return this.resetPasswordParentGroup.get('newUser.password');
  }

  get code(){
    return this.resetPasswordParentGroup.get('newUser.code');
  }


  sendCode(){
    if(this.sendEmailParentGroup.invalid){
      this.sendEmailParentGroup.markAllAsTouched();
      return;
    }
    let email = this.sendEmailParentGroup.value.user.email;
    this.auth.sendCodeToResetPassword(email).subscribe({
      next: response => {
        if(response == 1) {
          this.enableForm = true;
        } else {
          alert("Email does not exist")
        }
      }
    })
  }

  resetPassword(){
    if(this.resetPasswordParentGroup.invalid){
      this.resetPasswordParentGroup.markAllAsTouched();
      return;
    }
    let email = this.sendEmailParentGroup.value.user.email; 
    let password = this.resetPasswordParentGroup.value.newUser.password;
    let code = this.resetPasswordParentGroup.value.newUser.code;
    this.auth.resetPassword(email, password, code).subscribe({
      next: response => {
        if(response == 1) {
          alert("password reseted successfully");
          this.router.navigateByUrl('/login');
        } else {
          alert("Reset password failed")
        }
      } 
    });
    
  }
}
