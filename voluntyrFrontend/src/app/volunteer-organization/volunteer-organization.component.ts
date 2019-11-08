import { Component, OnInit } from '@angular/core';
import {VolunteerService} from '@app/_services/volunteer.service';
import {VolunteerOrganziation} from '@app/_models/VolunteerOrganziation';
import {environment} from '@environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {
  faEnvelopeOpen,
  faLandmark,
  faMapPin,
  faPhoneAlt,
  faRibbon,
  faStar
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-volunteer-organization',
  templateUrl: './volunteer-organization.component.html',
  styleUrls: ['./volunteer-organization.component.css']
})
export class VolunteerOrganizationComponent implements OnInit {

  constructor(private vs: VolunteerService, private activatedRoute: ActivatedRoute, private router: Router) { }

  private organization: VolunteerOrganziation;
  private orgId: string;

  faRating = faStar;
  faPhoneAlt = faPhoneAlt;
  faEnvelopeOpen = faEnvelopeOpen;
  faRibbon = faRibbon;
  faLandmark = faLandmark;
  faMapPin = faMapPin;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.orgId = params.get('id');
        this.getOrganization();
        if (!environment.production) {
          console.log(this.orgId);
        }
      }
    );
  }

  getOrganization() {
    this.vs.getOrganization(this.orgId).subscribe(
      data => {
        this.organization = data;
      },
      error => {
        if (!environment.production) {
          console.error(error);
        } else {
          alert("There was a problem finding this organization...");
          this.router.navigateByUrl("Volunteer");
        }
      }
    )
  }

}
