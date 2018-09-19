import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  private newGroup: any;
  private errors: any;
  
  constructor(private gs: GroupService, private router: Router) {}

  ngOnInit(){
    this.newGroup = {user:""};
    this.errors = [];
  }

  createGroup() {
    this.gs.add(this.newGroup).subscribe(data => {
      if (data['message'] || data['errors']){
        this.errors = [];
        this.errors.push(data['message']);
      }
      else {
        this.errors = [];
        this.router.navigateByUrl("/");
      }
    })
  }
}
