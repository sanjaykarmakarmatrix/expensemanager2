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
  searchTerm = new FormControl();
  searchResult: string[] = null;
  filteredOptions: Observable<string[]>;
  searchText: any = null;

  constructor(
    private commonService: CommonService,
    private dialogRef: MatDialogRef<AdditemComponent>, @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit() {

    this.searchTerm.valueChanges.subscribe(searchText => {
      if (searchText.length > 1) {
        this.commonService.userList(searchText).subscribe((responseData: any) => {
          console.log(responseData.details);
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
