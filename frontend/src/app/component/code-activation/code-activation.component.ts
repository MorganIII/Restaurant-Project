import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpaceValidator } from 'src/app/model/space-validator';
import { AuthenticationService } from 'src/app/service/security/authentication.service';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.css']
})
export class CodeActivationComponent implements OnInit{

  email: string = '';
  activateCodeParentGroup: FormGroup;
  constructor(private formChildGroup: FormBuilder,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('emailNotActivated') as string;
    this.myFormSignUp();
  }

  myFormSignUp() {
    this.activateCodeParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        code: new FormControl('',[
          Validators.required,
          SpaceValidator.notOnlySpace
        ])
      })
    })
  }


  activate(){
    if(this.activateCodeParentGroup.invalid){
      this.activateCodeParentGroup.markAllAsTouched();
      return;
    }
    let code = this.activateCodeParentGroup.get('user.code')?.value;
    this.auth.activateEmail(this.email, code).subscribe({
      next: response =>{
        if(response == 1) {
          alert('Your account is activated');
          sessionStorage.removeItem('emailNotActivated');
          this.router.navigate(['/login']);
        }
        else{
          alert('Your code is incorrect');
        }
      }
    })
  }


  get code(){
    return this.activateCodeParentGroup.get('user.code');
  }
}
