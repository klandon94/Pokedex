import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  all(){
    return this.http.get("/api/groups")
  }

  get(id){
    return this.http.get("/api/groups/" + id);
  }

  add(newGroup){
    return this.http.post("/api/groups", newGroup);
  }

  delete(id){
    return this.http.delete("/api/groups/" + id);
  }

}
