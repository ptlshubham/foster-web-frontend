import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';
import { CompanyService } from 'src/app/core/services/company.service';
import { TokensService } from 'src/app/core/services/tokens.service';

@Component({
  selector: 'app-daily-work-report',
  templateUrl: './daily-work-report.component.html',
  styleUrl: './daily-work-report.component.scss'
})
export class DailyWorkReportComponent {
  employeeList: any = [];
  selectedEmployeeIndex: number | null = null;
  dailyWork: any = [];
  page = 1;
  pageSize = 25;
  collectionSize = 0;
  paginateData: any = [];
  selectedDate: string = new Date().toISOString().split('T')[0];
  filteredDailyWork: any[] = [];
  tempTokenData: any = [];
  constructor(
    private companyService: CompanyService,
    public toastr: ToastrService,
    private tokensService: TokensService
  ) {
    this.getAllEmployeeDetails();
    this.getAllDailyWork();
  }

  onDateChange(event: any) {
    this.selectedEmployeeIndex = null;
    this.getAllDailyWork();
  }
  getAllEmployeeDetails() {
    this.companyService.getAllEmployeeDetailsData().subscribe((res: any) => {
      this.employeeList = res;
      this.employeeList = res.filter((employee: any) => employee.role == 'Designer');
    });
  }
  getAllDailyWork() {
    this.companyService.getAllDailyList().subscribe((res: any) => {
      res.forEach((item: any) => {
        item.type = 'Daily';
      });

      this.dailyWork = res.filter((item: any) => {
        const completedDate = new Date(item.completeddate).toISOString().split('T')[0];
        return completedDate === this.selectedDate;
      });

      this.getAllTokenDetails(); // Call getAllTokenDetails after getting daily work data
    });
  }

  getAllTokenDetails() {
    this.tempTokenData = [];

    this.tokensService.getAllTokenData().subscribe((res: any) => {
      this.tempTokenData = res.filter((item: any) => {
        const completedDate = new Date(item.updateddate).toISOString().split('T')[0];
        return completedDate === this.selectedDate && item.status === 'Completed';
      });

      if (this.tempTokenData.length > 0) {
        const getAssignedTokenEmpCalls = this.tempTokenData.map((element: any) =>
          this.tokensService.getAssignedTokenEmp(element.id).pipe(
            map((data: any) => ({
              elementId: element.id,
              assignedDesigners: data.filter((employee: any) => employee.role === 'Designer'),
              assignedManagers: data.filter((employee: any) => employee.role === 'Manager'),
            }))
          )
        );

        forkJoin(getAssignedTokenEmpCalls).subscribe((results: any) => {
          results.forEach((result: any) => {
            const tempToken = this.tempTokenData.find((token: any) => token.id === result.elementId);
            if (tempToken) {
              tempToken.assignedDesigners = result.assignedDesigners;
              tempToken.assignedManagers = result.assignedManagers;
            }
          });

          this.refreshData(); // Refresh data after forkJoin completes
        });
      } else {
        this.refreshData(); // Refresh data if no tokens found
      }
    });
  }

  refreshData() {
    this.dailyWork = this.dailyWork.filter((item: any) => item.type !== 'Token'); // Remove existing token data

    this.tempTokenData.forEach((element: any, index: number) => {
      this.dailyWork.push({
        type: 'Token',
        clientname: element.clientname,
        title: element.title,
        designers: element.assignedDesigners,
        managers: element.assignedManagers,
        completeddate: element.updateddate,
        date: element.createddate,
      });
    });
    for (let i = 0; i < this.dailyWork.length; i++) {
      this.dailyWork[i].index = i + 1;
    }
    
    this.collectionSize = this.dailyWork.length;
    this.filteredDailyWork = this.dailyWork;
    this.getPagination(); // Update pagination
  }

  getPagination() {
    this.paginateData = this.filteredDailyWork.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  selectEmployee(index: number, data: any) {
    this.selectedEmployeeIndex = index;
    this.filterDailyWorkByDesignerId(data.id);
  }

  filterDailyWorkByDesignerId(designerId: string) {
    this.dailyWork.forEach((element: any) => {
      if (element.type == 'Daily') {
        this.filteredDailyWork = this.dailyWork.filter((item: any) => item.designerid === designerId);
      }
      else if (element.type == 'Token') {

      }
    });
    // this.filteredDailyWork = this.dailyWork.filter((item: any) => item.designerid === designerId);
    this.collectionSize = this.filteredDailyWork.length;
    this.getPagination();
  }
}
