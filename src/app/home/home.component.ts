import { Component, OnInit } from '@angular/core';
import { AppService } from '../share/app-service/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {
    console.log(this.appService.test().toPromise().then);
  }
}
