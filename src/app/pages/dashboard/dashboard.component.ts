import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 *  Dashboard Component
 */

export class DashboardComponent implements OnInit {


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  title!: string;

  departmentData: any = [];
  imagesData: any = [];
  newsData: any = [];
  staffData: any = [];
  contactData: any = [];
  infraData: any = [];
  blogsData: any = [];
  resultData: any = [];
  instituteList: any = [];
  num: number = 0;
  role: any = localStorage.getItem('Role');
  company: any;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    // decimalPlaces: 2,
  };

  constructor(
    private homeService: HomeService,
  ) {

  }


  ngOnInit(): void {
    /**
     * BreadCrumb 
     */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Dashboard', active: true }
    ];
    this.company = localStorage.getItem('Company');  

  }

  /**
   * Fetches the data
   */
  
}
