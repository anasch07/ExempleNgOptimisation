import { Component, NgZone } from '@angular/core';
import { TestService } from "./test/services/test.service";
import { Chart } from 'chart.js/auto';
import { User, UsersService } from './optimizationPattern/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nb = 3;
  title = 'advancedNg';
  chart: any
  oddUsers: User[];
  evenUsers: User[];
  constructor(public testService: TestService, private ngZone: NgZone, private userService: UsersService) {
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
}
