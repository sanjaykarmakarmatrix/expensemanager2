import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as global from '../globalConfig';

import {HttpClient} from '@angular/common/http';

import {NgxPagerModule} from 'ngx-pager';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listData: any = null;
  imageUrl: any = null;

  displaySpinner = true;

  pagerConfig: any = null;
  totalRow: any = null;
  // result: Array<any> = [];

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private  http: HttpClient
  ) { }

  ngOnInit() {
    this.pagerConfig = {
      page: 1,
      perPage: 3,
      displayPageCount: 3,
      firstLastView: true,
      redirect : {
        type : 'q', // q=query string
        param : 'page'// param name
      },
      render: (page) => {
        this.commonService.groupList(page).subscribe((responseData: any) => {
          this.totalRow = responseData.details.totalRows;

          this.imageUrl = global.hostUrl + 'expensemanager2/' + responseData.details.imageFolder;
          this.listData = responseData.details.data;

          this.displaySpinner = false;
        });
      }
    };

    // this.commonService.groupList().subscribe((responseData: any) => {
    //   this.imageUrl = global.hostUrl + 'expensemanager2/' + responseData.details.imageFolder;
    //   this.listData = responseData.details.data;
    //   this.displaySpinner = false;
    // });

  }

}
