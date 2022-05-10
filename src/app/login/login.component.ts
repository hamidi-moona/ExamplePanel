import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  responsedata: any;

  constructor(private formbuilder: FormBuilder,
    private service: AuthService,
    private userService: ApiService,
    private route: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  proceedLogin() {
    if (this.loginForm.valid) {
      this.responsedata = this.loginForm.value;
      this.userService.getloginUser(this.responsedata.username, this.responsedata.password).subscribe(res => {
        if (res != null) {
          localStorage.setItem('token',res[0].UID);
          localStorage.setItem('isAdmin',res[0].isAdmin);
          this.route.navigate(['index']);
        }
      })
    }
  }

  get f()
  {
    return this.loginForm.controls;
  }
}

  


