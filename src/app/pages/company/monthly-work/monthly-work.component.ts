import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-monthly-work',
  templateUrl: './monthly-work.component.html',
  styleUrl: './monthly-work.component.scss'
})
export class MonthlyWorkComponent implements OnInit {
  clientsData: any = [];
  currentMonthData: any = [];
  clientWorkSummaryArray: any = [];
  num = 0;
  selectedMonth: string;
  selectedClientData: any = {};
  eid: any = localStorage.getItem('Eid');
  companyRole: any = localStorage.getItem('Role');
  tempArrayDailyList: any = [];
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    // decimalPlaces: 2,
  };
  constructor(
    public formBuilder: UntypedFormBuilder,
    private companyService: CompanyService,
    public toastr: ToastrService,
    private modalService: NgbModal,


  ) {
    const currentDate = new Date();
    this.selectedMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
  }
  ngOnInit(): void {
    this.getAllDailyWork();
  }

  onMonthChange() {
    this.getAllDailyWork();
  }

  getAllDailyWork() {
    this.tempArrayDailyList = [];
    this.companyService.getAllDailyList().subscribe((data: any) => {
      if (this.companyRole == 'Designer') {
        this.tempArrayDailyList = data.filter((daily: any) => daily.designerid == this.eid);
      }
      else if (this.companyRole == 'Manager') {
        this.tempArrayDailyList = data.filter((daily: any) => daily.managerid == this.eid);
      }
      else if (this.companyRole == 'companyAdmin') {
        this.tempArrayDailyList = data;
      }

      const selectedDate = new Date(this.selectedMonth);
      const selectedMonth = selectedDate.getMonth(); // 0-11
      const selectedYear = selectedDate.getFullYear();

      // Filter the data to include only entries from the selected month and year
      const selectedMonthData = this.tempArrayDailyList.filter((item: any) => {
        const itemDate = new Date(item.date); // Assuming the date column is named 'date'
        return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
      });

      // Create an object to store the results for each client
      const clientWorkSummary: { [key: string]: any } = {};

      // Process each item to aggregate data by client
      selectedMonthData.forEach((item: any) => {
        const clientId = item.clientid;
        const isCompleted = item.iscompleted;

        if (!clientWorkSummary[clientId]) {
          clientWorkSummary[clientId] = {
            clientname: item.clientname,
            logo: item.logo,
            totalWork: 0,
            totalCompleted: 0,
            totalPending: 0,
          };
        }

        clientWorkSummary[clientId].totalWork++;
        if (isCompleted) {
          clientWorkSummary[clientId].totalCompleted++;
        } else {
          clientWorkSummary[clientId].totalPending++;
        }
      });

      this.clientWorkSummaryArray = Object.keys(clientWorkSummary).map(clientId => ({
        clientid: clientId,
        ...clientWorkSummary[clientId],
      }));

    });
  }
  // getAllEmpDailyWork() {
  //   this.companyService.getAllDailyList().subscribe((data: any) => {
  //     const dailyData = data.filter((daily: any) => daily.designerid == this.eid);
  //     debugger
  //     const selectedDate = new Date(this.selectedMonth);
  //     const selectedMonth = selectedDate.getMonth(); // 0-11
  //     const selectedYear = selectedDate.getFullYear();

  //     // Filter the data to include only entries from the selected month and year
  //     const selectedMonthData = dailyData.filter((item: any) => {
  //       const itemDate = new Date(item.date); // Assuming the date column is named 'date'
  //       return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
  //     });

  //     // Create an object to store the results for each client
  //     const clientWorkSummary: { [key: string]: any } = {};

  //     // Process each item to aggregate data by client
  //     selectedMonthData.forEach((item: any) => {
  //       const clientId = item.clientid;
  //       const isCompleted = item.iscompleted;

  //       if (!clientWorkSummary[clientId]) {
  //         clientWorkSummary[clientId] = {
  //           clientname: item.clientname,
  //           logo: item.logo,
  //           totalWork: 0,
  //           totalCompleted: 0,
  //           totalPending: 0,
  //         };
  //       }

  //       clientWorkSummary[clientId].totalWork++;
  //       if (isCompleted) {
  //         clientWorkSummary[clientId].totalCompleted++;
  //       } else {
  //         clientWorkSummary[clientId].totalPending++;
  //       }
  //     });

  //     this.clientWorkSummaryArray = Object.keys(clientWorkSummary).map(clientId => ({
  //       clientid: clientId,
  //       ...clientWorkSummary[clientId],
  //     }));

  //   });
  // }

  extraLarge(exlargeModal: any, data: any) {
    data.selectedMonth = this.selectedMonth
    this.selectedClientData = data;
    this.modalService.open(exlargeModal, { size: 'xl', windowClass: 'modal-holder', centered: true });
  }
}