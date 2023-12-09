import { Component, OnInit } from '@angular/core';
import { User, UsersService } from "../users.service";
import * as ChartJs from 'chart.js/auto';
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css']
})
export class RhComponent {
  oddUsers: User[];
  evenUsers: User[];
  chart: any;
  constructor(private userService: UsersService) {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
  }

  getData() {
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];
    return data;
  }



  addUser(list: User[], newUser: string) {
    this.userService.addUser(list, newUser);
  }

}
