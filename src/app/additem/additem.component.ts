import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable, from } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commonService.userList().subscribe((responseData: any) => {
      console.log(responseData.details);
    });




    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
