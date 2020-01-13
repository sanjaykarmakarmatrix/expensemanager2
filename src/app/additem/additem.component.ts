import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable, from } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CommonService } from '../services/common.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  member: any = {
    id: '',
    group_id: '',
    name: ''
  };
  searchResult: Array<any> = [];
  searchTerm: FormControl = new FormControl();
  group: any ;

  constructor(
    private commonService: CommonService,
    private dialogRef: MatDialogRef<AdditemComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    
  }

  selectUser(id) {
    const selectUser = this.searchResult.find(item => item.id === id);

    this.member.user_id  = selectUser.id;
    this.member.name  = selectUser.name;
  }

  ngOnInit() {
    this.searchTerm.valueChanges.subscribe(searchText => {
      if (searchText.length > 0) {
        this.commonService.userList({'search_text': searchText}).subscribe((responseData: any) => {
          // console.log(responseData.details.list.rows);
          this.searchResult = responseData.details.list.rows;
        });
      }
    });
  }

  save() {
    this.dialogRef.close(this.member);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
