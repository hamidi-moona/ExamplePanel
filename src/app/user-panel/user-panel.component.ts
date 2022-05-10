import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinct, filter, map, mergeMap, switchMap, tap, toArray } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  
  userTask:any[]=[];
  USER_UID:any ;
  userName:string | undefined ;
  LoggedUser:any;

  constructor(private api:UserService,private route:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {

    this.USER_UID = localStorage.getItem('token');
   
    this.getAllUserTask();
    console.log(this.userTask);
  }


  getAllUserTask()
  {
    this.api.getAllUserTask().pipe(
        mergeMap( (results:any) => results ),
        filter( (result:any) => result.UID ==  this.USER_UID),
        toArray(),
        tap(console.log)
      ).subscribe({
      next:(res) => {
        this.userTask = res;
        this.userName = this.userTask[0].name + " " + this.userTask[0].lastName;
      },error:() => {
        console.log("Error to get User Task from api.")
      }
    })
  }

  UserlogOut()
  {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}

