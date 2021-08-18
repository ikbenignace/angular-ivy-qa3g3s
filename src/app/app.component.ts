import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';

import { OrganizationPublic } from '../models/organization';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';

  private accessKey: string;
  private organization: OrganizationPublic;

  constructor(private router: Router,private route: ActivatedRoute,private organizationService: OrganizationService) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e)
        this.route.paramMap.subscribe(params => {
          this.accessKey = params.get('accessKey');
          this.organizationService.getByKey(this.accessKey).subscribe(result => {
            this.organization = result;
          });
        });
      }
    });
  }

  ngOnInit() {
   
  }
}
