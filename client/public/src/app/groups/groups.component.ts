import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: any;

  constructor(private gs: GroupService) { }

  ngOnInit() {
    this.getGroupsFromService();
  }

  getGroupsFromService() {
    this.gs.all().subscribe(data => {
      this.groups = data;
    })
  }

  deleteGroup(group){
    let index = this.groups.map(i => {return i._id}).indexOf(group._id);
    this.groups.splice(index, 1);
  }
  
}
