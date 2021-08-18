import { Component, OnInit, Input } from '@angular/core';
import { OrganizationPublic } from '../../../models/organization';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() organization: OrganizationPublic;

  constructor() { }

  ngOnInit() {
  }

}
