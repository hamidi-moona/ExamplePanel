import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,filter, mergeMap, toArray, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000/User';

  constructor(private http:HttpClient) { }

  loadUser()
  {
    return this.http.get(this.apiUrl);
  }

  saveUser(userData:any)
  {
    return this.http.post(this.apiUrl,userData);
  }

  LoadUserByCode(id:number)
  {
    return this.http.get(this.apiUrl+'/'+id);
  }

  getAllUserTask()
  {
    return this.http.get<any>("http://localhost:3000/UserTask").pipe(map((res:any) => {
      return res;
    }))
  }
}


// .pipe(
//   mergeMap( (results:any) => results ),
//   filter( (result:any) => result.UID ==  UID),
//   toArray(),
//   tap(console.log)
// );