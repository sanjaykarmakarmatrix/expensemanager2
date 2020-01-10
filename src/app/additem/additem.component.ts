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
  searchTerm  = new FormControl();
  searchResult: string[] = null;
  filteredOptions: Observable<string[]>;
  searchText: any = null;
  // search_text: any = null;
  member: any = {
    id: '',
    name: ''
  };

  constructor(
    private commonService: CommonService,
    private dialogRef: MatDialogRef<AdditemComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.searchTerm.valueChanges.subscribe(searchText => {
      if (searchText.length > 0) {
        this.commonService.userList({'search_text': searchText}).subscribe((responseData: any) => {
          // console.log(responseData.details.list.rows);
          this.searchResult = responseData.details.list.rows;
        });
      }
    });
   }

   selectUser(id) {
    let selectUser = this.searchResult.find((item) => {
      return item.id = id;
    });
    this.member.user_id  = id;
    this.member.name  = name;
    // console.log(this.member);
  }

  ngOnInit() {
  }

  
  save()
	{
		this.dialogRef.close(this.member);
	}
  onNoClick(): void {
    this.dialogRef.close();
  }

}
