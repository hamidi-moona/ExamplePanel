import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { UserTaskData } from './userTask.model';

@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss']
})
export class OpenDialogComponent implements OnInit {

  formDialog !: FormGroup;
  AllUser: any = [];
  userSelected: UserTaskData = new UserTaskData;
  actionBtn:string = 'اضافه کردن';

  constructor(private formBuilder: FormBuilder,
    private _api: ApiService,
    private dialogRef: MatDialogRef<OpenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit() {
    this.formDialog = this.formBuilder.group({
      UID: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      task: ['', Validators.required]
    });

    this.getAllUser();
    if (this.editData) {
      this.actionBtn = 'ویرایش کردن';
      this.formDialog.controls['UID'].setValue(this.editData.UID);
      this.formDialog.controls['name'].setValue(this.editData.name);
      this.formDialog.controls['lastName'].setValue(this.editData.lastName);
      this.formDialog.controls['task'].setValue(this.editData.task);
    }
  }


  getFormData() {
    console.log(this.formDialog.value);
  }

  getAllUser() {
    this._api.getAllUser().subscribe(res => {
      this.AllUser = res;
      console.log(this.AllUser);
    })
  }

  selectChangeHandler_name(event: any) {
    this.userSelected.name = event.target.value;
  }

  selectChangeHandler_lastname(event: any) {
    this.userSelected.lastName = event.target.value;
  }


  //Create
  createTaskUser() {
    if (!this.editData) {
      for (const key in this.AllUser) {
        if (this.AllUser[key].name == this.userSelected.name && this.AllUser[key].lastName === this.userSelected.lastName) {
          var UIDD = this.AllUser[key].UID;
          console.log(UIDD);
        }
      }
      this.userSelected.UID = UIDD;
      this.userSelected.task = this.formDialog.controls['task'].value;

      this._api.createTask(this.userSelected).subscribe({
        next: (res) => {
          alert("اطلاعات با موفقیت ثبت شده است!");
          this.dialogRef.close('save');
        }, error: () => {
          alert("اطلاعات با موفقیت ثبت نشده است");
        }
      })
    }else
    {
      this.UpdateTask();
    }
  }

  UpdateTask()
  {
    this._api.editTask(this.formDialog.value,this.editData.id).subscribe({
      next:(res) => {
        alert("اطلاعات با موفقیت ویرایش شد!");
        this.formDialog.reset();
        this.dialogRef.close('update');
      },error:() => {
        alert("اطلاعات با موفقیت ویرایش نشد!");
      }
    })
  }

}
