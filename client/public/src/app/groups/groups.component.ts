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
    this.gs.attach(this);
  }

  getGroupsFromService() {
    this.gs.allGroups().subscribe(data => {
      this.groups = data;
    })
  }

  update() {
    this.getGroupsFromService();
  }

}
