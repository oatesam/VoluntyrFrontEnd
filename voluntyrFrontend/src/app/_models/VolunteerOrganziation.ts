import {Event} from '@app/_models/Event';

export class VolunteerOrganziation {
  organization: {
    name: string;
    street_address: string;
    city: string;
    state: string;
    organization_motto: string;
    phone_number: string;
    end_user: {
      email: string;
    };
  };
  events: Event[];
}
