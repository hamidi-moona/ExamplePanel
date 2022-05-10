import { Component, Inject, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenDialogComponent } from '../open-dialog/open-dialog.component';
import { ApiService } from '../services/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { userElement } from './userElement.interface';
import { filter, mergeMap, tap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit  {

  toggleNav:boolean = true;

  userTask:any[]=[];

  UID_logged = localStorage.getItem('token');
  userLogeed:string | undefined;

  constructor(private dialog:MatDialog,private _api:ApiService, private route:Router) { }

  ngOnInit(): void {
    this.getAllUserTask();
    this.getloggedUser(this.UID_logged);
  }

  openNavbar()
  {
    this.toggleNav = !this.toggleNav;
  }

  AddTaskDialog()
  {
    this.dialog.open(OpenDialogComponent,{
      width:'50%'
    }).afterClosed().subscribe(val => {
      if(val === 'save')
      {
        this.getAllUserTask();
      }
    })
  }

  getAllUserTask()
  {
    this._api.getAllUserTask().subscribe({
      next:(res) => {
        this.userTask = res;
      },error:() => {
        console.log("Error to get User Task from api.")
      }
    })
  }

  deleteTask(id:number)
  {
    this._api.deleteTask(id).subscribe({
      next:(res) => {
        alert("اطلاعات با موفقیت حذف شد!!");
        this.getAllUserTask();
      },error:() => {
        alert("اطلاعات با موفقیت حذف نشد!!");
      }
    })
  }

  editTask(raw:any)
  {
    console.log(raw);
    this.dialog.open(OpenDialogComponent,{
      width:'50%',
      data: raw
    }).afterClosed().subscribe(val => {
      if(val === 'update')
      {
        this.getAllUserTask();
      }
    })
  }

  getloggedUser(UID_logged:any)
  {
    this._api.getUserByUID(UID_logged).pipe(
      mergeMap( (results:any) => results ),
      filter( (result:any) => result.UID ==  this.UID_logged)
    ).subscribe({
    next:(res) => {
      this.userLogeed = res.name + "  " + res.lastName;
    },error:() => {
      console.log("Error to get User Task from api.")
    }
  })
    // this._api.getUserByUID(UID_logged).subscribe({
    //   next:(res) => {
    //     this.userLogeed = res;
    //   },error:() => {
    //     console.log('Error');
    //   }
    // })
  }

  logOut()
  {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
