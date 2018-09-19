import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private listeners = [];

  constructor(private http: HttpClient) { }

  attach(component){
    this.listeners.push(component);
  }
  notify(){
    for (let listener of this.listeners) listener.update();
  }

  allGroups(){
    return this.http.get("/api/groups")
  }

  getGroup(id){
    return this.http.get("/api/groups/" + id);
  }

  addGroup(newGroup){
    return this.http.post("/api/groups", newGroup);
  }

}
