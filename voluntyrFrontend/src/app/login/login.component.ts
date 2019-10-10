import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute, Data} from '@angular/router';
import {AuthenticationService} from '@app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() email: string;

  constructor(private authservice: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
    if (this.authservice.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  emailControl = new FormControl('');
  passwordControl = new FormControl('');

  ngOnInit() {
    this.emailControl.setValue(this.email);
  }

  verifyLogin() {
    this.authservice.login(this.emailControl.value, this.passwordControl.value).subscribe(
      resp => {
        console.log(resp);
      }, error => {

      }

    );
  }


}
