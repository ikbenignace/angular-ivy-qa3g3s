import { Component } from '@angular/core';
import { OrganizationPublic } from '../../models/organization';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;


  private accessKey: string;
  public organization: OrganizationPublic;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) {
    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.organizationService.getByKey(this.accessKey).subscribe(result => {
        this.organization = result;
      });
    });
  }



  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
