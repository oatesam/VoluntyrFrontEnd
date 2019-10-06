import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {AccountsService} from '../_helpers/accounts.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountsService, private router: Router, private route: ActivatedRoute) { }
  name = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');

  ngOnInit() {}

  verifyRegistration() {
    this.accountService.register(this.name, this.email, this.password).subscribe(
      resp => {
        if (resp === 201) {
          console.log(resp);
          this.router.navigateByUrl('../../login');
        } else if (resp === 401) {
          console.log(resp);
          this.router.navigateByUrl('');
        }
      }
    );
  }

}
