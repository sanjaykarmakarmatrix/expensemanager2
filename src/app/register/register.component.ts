import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (localStorage.getItem('_token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.commonService.registration(this.registerForm.value).subscribe((responseData: any) => {
      this.loading = false;
      this.submitted = false;
      if (responseData.status === 'success') {
        this.loading = false;
        this.submitted = false;
        this.registerForm.reset();
        Swal.fire({
          title: 'Registration',
          text: 'Registration successful',
          icon: responseData.status,
          showCancelButton: false,
          confirmButtonText: 'OK',
          cancelButtonText: ''
        });
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          title: 'Registration',
          text: responseData.details,
          icon: responseData.status,
          showCancelButton: false,
          confirmButtonText: 'OK',
          cancelButtonText: ''
        });
      }
    });
  }

}
