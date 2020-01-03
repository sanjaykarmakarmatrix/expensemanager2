import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  userInfo: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (localStorage.getItem('_token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.authService.sendToken(this.loginForm.value.email);
      this.router.navigate(['/dashboard']);
    }

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.commonService.login(this.loginForm.value).subscribe((responseData: any) => {
      this.submitted = false;
      this.loading = false;

      if (responseData.status === 'success') {
        this.loginForm.reset();
        // Swal.fire({
        //   title: 'Login',
        //   text: responseData.details.msg,
        //   icon: responseData.status,
        //   showCancelButton: false,
        //   confirmButtonText: 'OK',
        //   cancelButtonText: ''
        // });
        localStorage.setItem('_token', responseData.details.userData.access_token);

        let userInfo = JSON.stringify(responseData.details.userData);
        localStorage.setItem('user', userInfo);
        this.router.navigate(['/dashboard']);
      } else {
        Swal.fire({
          title: 'Login',
          text: responseData.details.msg,
          icon: responseData.status,
          showCancelButton: false,
          confirmButtonText: 'OK',
          cancelButtonText: ''
        });
      }

    });

  }

}
