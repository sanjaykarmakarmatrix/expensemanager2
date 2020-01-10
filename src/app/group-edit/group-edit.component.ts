import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as global from '../globalConfig';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdditemComponent } from '../additem/additem.component';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  title = 'Update Group';
  updateGroupForm: FormGroup;
  loading = false;
  submitted = false;
  base64textString = [];
  groupId: any = null;
  showData: any = null;
  imageUrl: any = null;
  displaySpinner = true;
  member = [];

  myControl = new FormControl();
  // optionValues: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;
  options: any;

  animal: string;
  name: string;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(this.optionValues);

      // console.log(params.get('id'));
      this.groupId = params.get('id');
      this.commonService.groupEdit(this.groupId).subscribe((responseData: any) => {
        this.showData = responseData.details.data;
        console.log(this.showData);
        this.imageUrl = global.hostUrl + 'expensemanager2/' + responseData.details.imageFolder;
        this.displaySpinner = false;
      });
    });

    this.updateGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', [Validators.required]]
    });

  }

  handleReaderLoaded(e) {
    // this.base64textString.push('data:image/jpeg;base64,' + btoa(e.target.result));
    this.base64textString.push(btoa(e.target.result));
    console.log(this.base64textString);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(AdditemComponent, {
      width: '500px',
      height: '300px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(this.animal);
    });
  }



  onSubmit() {
    this.submitted = true;
  }

}
