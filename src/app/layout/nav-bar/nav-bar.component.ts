import {Component, OnInit, Input} from '@angular/core';
import {TranslationTextService} from '../../../services/translation-text.service';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../services/organization.service';
import {BaseComponent} from '../../base/base.component';
import {switchMap} from 'rxjs/operators';
import {StartSettingsService} from '../../../services/start-settings.service';
import {StartSettings} from '../../../models/startsettings/start-settings';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent extends BaseComponent implements OnInit {

  accessKey: string;
  memberKey: string;
  formKey: string;
  url: string;
  startSettings: StartSettings;
  @Input() language: string;
  @Input() accesskey: string;

  constructor(protected route: ActivatedRoute,
              protected organizationService: OrganizationService,
              protected translationTextService: TranslationTextService,
              protected startSettingsService: StartSettingsService) {
    super("MEMBERMONEY", route, organizationService, translationTextService);
  }

  ngOnInit() {

    this.route.firstChild.firstChild.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.memberKey = params.get('memberKey');
      this.formKey = params.get('formKey');

    })

    if (this.memberKey) {
      this.route.firstChild.firstChild.url.subscribe(url => {
        this.url = url[1].path;
      });
    }

    this.startSettingsService.getForOrganisationByKey(this.accessKey).subscribe(response => {
      this.startSettings = response;
    });
  }
}
