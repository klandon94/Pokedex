import { Component } from '@angular/core';
import { GroupService } from './group.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private newGroup: any;
  private errors: any;
  
  constructor(private gs: GroupService) {this.init();}

  init() {
    this.newGroup = {user:""};
    this.errors = [];
  }

  createGroup() {
    this.gs.addGroup(this.newGroup).subscribe(data => {
      if (data['message'] || data['errors']){
        this.errors = [];
        this.errors.push(data['message']);
      }
      else {
        this.errors = [];
        this.gs.notify();
        this.init();
      }
    })
  }
  
}
