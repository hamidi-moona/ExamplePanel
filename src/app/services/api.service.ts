import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

   // register User
   registerUSer(data:any)
   {
     return this._http.post<any>("http://localhost:3000/User",data).pipe(map((res:any) => {
       return res;
     }));
   }

  //Get All User
  getAllUser()
  {
    return this._http.get<any>("http://localhost:3000/User").pipe(map((res:any) => {
      return res;
    }))
  }

  getloginUser(userName:any,password:any)
  {
    return this._http.get<any>("http://localhost:3000/User").pipe(map((res:any) => {
      return res.filter((item:any) => item.name == userName && item.password == password);
    }))
  }

  //getUserByUID
  getUserByUID(UID:any)
  {
    return this._http.get<any>("http://localhost:3000/User").pipe(map((res:any) => {
      return res.filter((item:any) => item.UID == +UID);
    }))
  }
  //Get All Task
  getAllUserTask()
  {
    return this._http.get<any>("http://localhost:3000/UserTask").pipe(map((res:any) => {
      return res;
    }))
  }

  //create Task
  createTask(data:any)
  {
    return this._http.post("http://localhost:3000/UserTask",data).pipe(map((res:any) => {
      return res;
    }));
  }

  // Edit created Task
  editTask(data:any,id:number)
  {
    return this._http.put<any>("http://localhost:3000/UserTask/"+id,data).pipe(map((res:any) => {
      return res;
    }))
  }


  // Delete Created Task
  deleteTask(id:number)
  {
    return this._http.delete<any>("http://localhost:3000/UserTask/"+id).pipe(map((res:any) => {
      return res;
    }));
  }
}
