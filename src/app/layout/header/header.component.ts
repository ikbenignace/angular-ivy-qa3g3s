import { Component, OnInit, Input } from '@angular/core';
import { OrganizationPublic } from '../../../models/organization';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() organization: OrganizationPublic;

  constructor() { }

  ngOnInit() {
  }

}
