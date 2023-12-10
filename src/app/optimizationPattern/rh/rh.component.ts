import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { User, UsersService } from "../users.service";
import * as ChartJs from 'chart.js/auto';
import {Chart} from "chart.js/auto";
import {UserListComponent} from "../user-list/user-list.component";
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css']
})

export class RhComponent {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;
  oddUsers: User[];
  evenUsers: User[];
  chart: any;
  constructor(private userService: UsersService,private ngZone: NgZone) {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
  }
  ngOnInit() {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];
    this.ngZone.runOutsideAngular(() => {
      this.chart = new Chart("MyChart",
          {
            type: 'bar',
            data: {
              labels: data.map(row => row.users),
              datasets: [
                {
                  label: 'Entreprise stats',
                  data: data.map(row => row.count)
                }
              ]
            }
          });
    });
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
    // out of bound change detection
    this.updateChartData();
    console.log("here1")

    if (this.userListComponent) {
      this.userListComponent.changeDetectorRef.detectChanges();
    }
    this.oddUsers = [...this.userService.getOddOrEven(true)];
    this.evenUsers = [...this.userService.getOddOrEven()];
    // log both lists
    console.log(this.oddUsers);
    console.log(this.evenUsers);
  }

  private updateChartData() {
    const data = this.getData();

    this.ngZone.run(() => {
      this.chart.data.datasets[0].data = data.map(row => row.count);
      this.chart.update();
    });
  }


}
