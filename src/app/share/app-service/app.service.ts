import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'src/app/config/config';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-service/api.service';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(public router: Router, private apiService: ApiService) {}
  test() {
    return this.apiService.get<any>(
      `${Config.apiHost.test}`,
      environment.apiHost
    );
  }
}
