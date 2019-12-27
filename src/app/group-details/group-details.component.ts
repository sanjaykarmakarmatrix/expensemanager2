import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  updateGroupForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
