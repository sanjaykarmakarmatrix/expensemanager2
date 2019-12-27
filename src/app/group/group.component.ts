import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  createGroupForm: FormGroup;
  loading = false;
  submitted = false;
  base64textString = [];

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', [Validators.required]]
    });
  }

  handleReaderLoaded(e) {
    // this.base64textString.push('data:image/jpeg;base64,' + btoa(e.target.result));
    this.base64textString.push(btoa(e.target.result));
  }
  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    // const fileExtension = file.name.split('.').pop();
    this.base64textString = [];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createGroupForm.invalid) {
      return;
    }

    this.loading = true;

    this.createGroupForm.value.image = this.base64textString[0];
    // console.log(this.createGroupForm.value);

    this.commonService.createGroup(this.createGroupForm.value).subscribe((responseData: any) => {
      this.loading = false;
      this.submitted = false;
      if (responseData.status === 'success') {
        this.loading = false;
        this.submitted = false;
        this.createGroupForm.reset();
        Swal.fire({
          title: 'Group Creation',
          text: 'Group created successfully',
          icon: responseData.status,
          showCancelButton: false,
          confirmButtonText: 'OK',
          cancelButtonText: ''
        });
        this.router.navigate(['/dashboard']);
      } else {
        Swal.fire({
          title: 'Group Creation',
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
