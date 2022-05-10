import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, map } from 'rxjs';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin: any;

  constructor(private http: HttpClient, private _userService: ApiService) { }



  IsLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  HaveAccess() {

    // const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaXNTb2NpYWwiOnRydWV9.4pcPyMD09olPSyXnrXCjTwXyr4BsezdI1AVTmud2fU4";
    // console.log(atob(token.split(".")[1]));
    // var _extractToken = Number(localStorage.getItem('token'));
    //  this._userService.getUserByUID()
    // var _extractToken = logginToken.split('.')[1];
    // var _atobdata = atob(_extractToken);
    // var _finaldata = JSON.parse(_atobdata);

    let isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin == 'true') {
      alert("خوش آمدید ");
      return true;
    }
    else {
      alert("اجازه دسترسی ندارید");
      return false;
    }
  }
}
