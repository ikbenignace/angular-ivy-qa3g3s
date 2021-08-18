import { Component, OnInit } from '@angular/core';
import { OrganizationPublic } from '../../../models/organization';
import { OrganizationService } from '../../../services/organization.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {

  private accessKey: string;
  private language: string;
  public organization: OrganizationPublic;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) {
    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.language = params.get('language');
      this.organizationService.getByKey(this.accessKey).subscribe(result => {
        this.organization = result;
      });
    });
  }

  ngOnInit() {
  }

}
