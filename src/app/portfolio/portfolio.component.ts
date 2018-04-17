import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service'
import { UserProfile } from '../models/userprofile.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  private userProfile : UserProfile;

  constructor(public userService : UserService) { }

  ngOnInit() {
    // after login get userHash
    //let hash : string = "userHashish";
    //this._userService.setUserHash(hash);

    this.initUserInfo();
  }

  private initUserInfo() {
    if (!environment.production) console.log('initUserInfo');

    // get the userprofile async
    this.userService.getUserProfile()
      .subscribe(u => {
          this.userProfile = u;
        });

  }



}
