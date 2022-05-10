import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from './user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  checked = false;
  constructor(private formBuilder: FormBuilder,
    private _api: ApiService,
    private route: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      UID: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      isAdmin: ['']
    })

  }


  userRegister() {
    if(this.registerForm.valid)
    {
      const UserInfo:User = {
        UID :Math.floor(Math.random()*1000),
        name: this.registerForm.controls['name'].value,
        lastName: this.registerForm.controls['lastName'].value,
        password:  this.registerForm.controls['password'].value,
        email :  this.registerForm.controls['email'].value,
        isAdmin :  this.registerForm.controls['isAdmin'].value,
      }
      this._api.registerUSer(UserInfo).subscribe({
        next: (res) => {
          console.log(res);
          alert("ثبت نام با موفقیت انجام شد");
        },
        error: () => {
          alert("ثبت نام با موفقیت انجام نشد");
        }
      })
    }

    this.registerForm.reset();
  }


  get f() {
    return this.registerForm.controls;
  }
}


