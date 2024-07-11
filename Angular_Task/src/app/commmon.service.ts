import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommmonService {
  readonly url ="http://localhost:3000/";
  
  constructor(private http:HttpClient) { }

  AddUpdateUser(user :any,typeData:string):Observable<any>{
    console.log(user.id)
    if (typeData==='Add'){
      return this.http.post(this.url+"User",user);
    }
      return this.http.put(this.url+"User/"+user.id,user);
  
  }
  GetAllUser():Observable<any>{
    return this.http.get(this.url+"User");
  }
  DeleteUserByID(id:any):Observable<any>{
    return this.http.delete(this.url+"User/"+id);
  }
  GetUserByID(id:any):Observable<any>{
    return this.http.get(this.url+"User/"+id);
  }

}
