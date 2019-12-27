import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as global from '../globalConfig';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listData: any = null;
  imageUrl: any = null;

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.commonService.groupList().subscribe((responseData: any) => {
      this.imageUrl = global.hostUrl + 'expensemanager2/' + responseData.details.imageFolder;
      this.listData = responseData.details.data;
    });
  }

}
